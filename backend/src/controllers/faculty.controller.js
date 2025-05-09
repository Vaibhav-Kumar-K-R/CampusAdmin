import { Department } from "../models/department.model.js";
import { Semester } from "../models/semester.model.js";
import { Section } from "../models/section.model.js";
import { Faculty } from "../models/faculty.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Add Faculty
export const addFaculty = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      institutionDomain,
      departmentId,
      designation,
      joiningDate,
      facultyId,
    } = req.body;

    if (
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !institutionDomain ||
      !phone ||
      !departmentId ||
      !designation ||
      !joiningDate ||
      !facultyId
    ) {
      const errorMessage = "All fields are required";

      return res.status(400).json({
        message: errorMessage,
        data: [],
        code: 400,
      });
    }

    // Password length validation
    if (password.length < 8) {
      const errorMessage = "Password should be at least 8 characters";

      return res.status(400).json({
        message: errorMessage,
        data: [],
        code: 400,
      });
    }

    // Phone length validation
    if (phone.length !== 10) {
      const errorMessage = "Please enter a valid phone number";

      return res.status(400).json({
        message: errorMessage,
        data: [],
        code: 400,
      });
    }

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      const errorMessage = "Please provide a valid email address";

      return res.status(400).json({
        message: errorMessage,
        data: [],
        code: 400,
      });
    }

    // Check Institution Domain
    if (req.institutionDomain !== institutionDomain) {
      return res.status(400).json({
        message: "Faculty must belong to the same institution as the admin",
        data: [],
        code: 400,
      });
    }

    // Check if the email matches the institution domain
    if (!email.endsWith(`@${req.institutionDomain}`)) {
      const errorMessage = "Email must belong to the institution domain";

      return res.status(400).json({
        message: errorMessage,
        data: [],
        code: 400,
      });
    }

    // Validate Department
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({
        message: "Department not found",
        data: [],
        code: 404,
      });
    }

    // Check if faculty with the same email exists
    const existingFacultyWithEmail = await Faculty.findOne({ email });
    if (existingFacultyWithEmail) {
      return res.status(400).json({
        message: "Faculty with this email already exists",
        data: [],
        code: 400,
      });
    }

    const existingFacultyWithFacultyId = await Faculty.findOne({
      institutionDomain: req.institutionDomain,
      facultyId,
    });

    if (existingFacultyWithFacultyId) {
      return res.status(400).json({
        message: "Faculty with this ID already exists",
        data: [],
        code: 400,
      });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new Faculty
    const newFaculty = new Faculty({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      facultyId,
      phone,
      institutionDomain,
      departmentId,
      designation,
      joiningDate,
    });

    // Save Faculty to DB
    await newFaculty.save();

    return res.status(201).json({
      message: "Faculty added successfully",
      data: { faculty: newFaculty },
      code: 201,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: [],
      code: 500,
    });
  }
};

export const loginFaculty = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const errorMessage = "Email and password are required";

      return res
        .status(400)
        .json({ message: errorMessage, data: [], code: 400 });
    }

    let faculty = await Faculty.findOne({ email });
    if (!faculty) {
      const errorMessage = "Faculty not found";

      return res
        .status(404)
        .json({ message: errorMessage, data: [], code: 404 });
    }

    const match = await bcrypt.compare(password, faculty.password);
    if (!match) {
      const errorMessage = "Incorrect password";

      return res
        .status(401)
        .json({ message: errorMessage, data: [], code: 401 });
    }

    const token = jwt.sign(
      {
        userId: faculty._id,
        email: faculty.email,
        role: "Faculty",
        institutionDomain: faculty.institutionDomain,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" },
    );

    let facultyData = faculty.toObject();
    facultyData.role = "Faculty";

    console.log(facultyData.institutionDomain);

    return res.status(200).json({
      message: "Login successful",
      data: [{ token }, { faculty: facultyData }],
      code: 200,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: [], code: 500 });
  }
};

export const getFacultySections = async (req, res) => {
  try {
    const facultyId = req.params.id;

    if (!facultyId) {
      return res.status(400).json({
        message: "Faculty ID is required",
        data: [],
        code: 400,
      });
    }

    // Find sections where the faculty is assigned
    const sections = await Section.find({
      "courseFacultyMappings.facultyId": facultyId,
    })
      .populate("semesterId")
      .populate("students")
      .populate("courseFacultyMappings.courseId");

    return res.status(200).json({
      message: "Sections retrieved successfully",
      data: { sections },
      code: 200,
    });
  } catch (error) {
    console.error(`Error fetching faculty sections: ${error.message}`);
    return res.status(500).json({
      message: "Internal Server Error",
      data: [],
      code: 500,
    });
  }
};

export const getFacultySemesters = async (req, res) => {
  try {
    const { id } = req.params;

    // Find sections where the faculty teaches
    const sections = await Section.find({
      "courseFacultyMappings.facultyId": id,
    }).populate("semesterId");

    // Extract unique semesters
    const semesterIds = [
      ...new Set(sections.map((section) => section.semesterId?._id.toString())),
    ];

    // Find semester details
    const semesters = await Semester.find({ _id: { $in: semesterIds } });

    return res.status(200).json({
      message: "Semesters fetched successfully",
      data: { semesters },
      code: 200,
    });
  } catch (error) {
    console.error(`Error fetching semesters for faculty: ${error.message}`);
    return res.status(500).json({
      message: "Internal Server Error",
      data: [],
      code: 500,
    });
  }
};

// Get All Faculties
export const getFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find({
      institutionDomain: req.institutionDomain,
    })
      .populate("departmentId")
      .populate("sections");

    return res.status(200).json({
      message: "Faculties fetched successfully",
      data: { faculties },
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: [],
      code: 500,
    });
  }
};

// Get Faculty by ID
export const getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({
      _id: req.params.id,
      institutionDomain: req.institutionDomain,
    })
      .populate("departmentId")
      .populate("sections");

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found or does not belong to your institution",
        data: [],
        code: 404,
      });
    }

    return res.status(200).json({
      message: "Faculty fetched successfully",
      data: { faculty },
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: [],
      code: 500,
    });
  }
};

// Update Faculty
export const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "No valid fields provided for update",
        data: [],
        code: 400,
      });
    }

    // Ensure faculty exists and belongs to admin's institution domain
    const existingFaculty = await Faculty.findOne({
      _id: id,
      institutionDomain: req.institutionDomain,
    });
    if (!existingFaculty) {
      return res.status(404).json({
        message: "Faculty not found or unauthorized update attempt",
        data: [],
        code: 404,
      });
    }

    if (
      updateData.email &&
      !updateData.email.endsWith(`@${existingFaculty.institutionDomain}`)
    ) {
      return res.status(400).json({
        message: "Email must belong to the institution domain",
        data: [],
        code: 400,
      });
    }

    if (updateData.password) {
      if (updateData.password.length < 8) {
        return res.status(400).json({
          message: "Password should be at least 8 characters",
          data: [],
          code: 400,
        });
      }
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    if (updateData.phone) {
      if (!/^\d{10}$/.test(updateData.phone)) {
        return res.status(400).json({
          message: "Please enter a valid 10-digit phone number",
          data: [],
          code: 400,
        });
      }
    }

    if (updateData.role && existingFaculty.role !== "admin") {
      return res.status(403).json({
        message: "Unauthorized to modify role",
        data: [],
        code: 403,
      });
    }

    const updatedFaculty = await Faculty.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Faculty updated successfully",
      data: { faculty: updatedFaculty },
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: [],
      code: 500,
    });
  }
};

// Delete Faculty
export const deleteFaculty = async (req, res) => {
  try {
    const deletedFaculty = await Faculty.findOneAndDelete({
      _id: req.params.id,
      institutionDomain: req.institutionDomain,
    });

    if (!deletedFaculty) {
      return res.status(404).json({
        message: "Faculty not found or unauthorized deletion attempt",
        data: [],
        code: 404,
      });
    }

    return res.status(200).json({
      message: "Faculty deleted successfully",
      data: [],
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      data: [],
      code: 500,
    });
  }
};

export const updateFacultyDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const { designation } = req.body;

    const allowedDesignations = [
      "Professor",
      "Associate Professor",
      "Assistant Professor",
      "Lecturer",
    ];

    if (!allowedDesignations.includes(designation)) {
      return res.status(400).json({
        message: "Invalid designation provided.",
        data: [],
        code: 400,
      });
    }

    const faculty = await Faculty.findOneAndUpdate(
      { _id: id, institutionDomain: req.institutionDomain },
      { designation },
      { new: true, runValidators: true },
    );

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found or unauthorized update.",
        data: [],
        code: 404,
      });
    }

    return res.status(200).json({
      message: "Designation updated successfully.",
      data: { faculty },
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while updating the designation.",
      data: [],
      code: 500,
    });
  }
};
