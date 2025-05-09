import { Department } from "../models/department.model.js";
import { Semester } from "../models/semester.model.js";
import { Section } from "../models/section.model.js";

export const addSemester = async (req, res) => {
  try {
    const { name, semesterCode, departmentId, startDate, endDate } = req.body;

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({
        message: "Department not found",
        data: [],
        code: 404,
      });
    }

    // Check if a semester with the same name or code already exists
    const existingSemesterByCode = await Semester.findOne({ semesterCode });

    if (existingSemesterByCode) {
      return res.status(400).json({
        message: "Semester with the same code already exists",
        data: [],
        code: 400,
      });
    }

    const newSemester = new Semester({
      name,
      semesterCode,
      departmentId,
      startDate,
      endDate,
      institutionDomain: req.institutionDomain,
    });

    await newSemester.save();

    department.semesters.push(newSemester._id);
    await department.save();

    return res.status(201).json({
      message: "Semester added successfully",
      data: { semester: newSemester },
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

// Get all semesters
export const getSemesters = async (req, res) => {
  try {
    const semesters = await Semester.find().populate("departmentId");
    return res.status(200).json({
      message: "Semesters fetched successfully",
      data: { semesters },
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

// Get a semester by ID
export const getSemesterById = async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id)
      .populate("departmentId")
      .populate("sections");
    if (!semester) {
      return res.status(404).json({
        message: "Semester not found",
        data: [],
        code: 404,
      });
    }
    return res.status(200).json({
      message: "Semester fetched successfully",
      data: { semester },
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

// Update a semester
export const updateSemester = async (req, res) => {
  try {
    const { semesterCode } = req.body;
    const { id } = req.params;

    // Check if semester exists
    const existingSemester = await Semester.findById(id);
    if (!existingSemester) {
      return res.status(404).json({
        message: "Semester not found",
        data: [],
        code: 404,
      });
    }

    // Check if another semester already exists with the same semesterCode
    if (semesterCode) {
      const duplicateSemester = await Semester.findOne({
        semesterCode,
        _id: { $ne: id }, // Exclude the current semester from the check
      });

      if (duplicateSemester) {
        return res.status(400).json({
          message: "Semester with the same code already exists",
          data: [],
          code: 400,
        });
      }
    }

    // Proceed with the update
    const updatedSemester = await Semester.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      message: "Semester updated successfully",
      data: { semester: updatedSemester },
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

// Delete a semester and its associated sections
export const deleteSemester = async (req, res) => {
  try {
    const semester = await Semester.findById(req.params.id);
    if (!semester) {
      return res.status(404).json({
        message: "Semester not found",
        data: [],
        code: 404,
      });
    }

    // Delete all sections associated with this semester
    await Section.deleteMany({ _id: { $in: semester.sections } });

    // Remove semester reference from the department
    await Department.findByIdAndUpdate(semester.departmentId, {
      $pull: { semesters: semester._id },
    });

    // Delete the semester itself
    await Semester.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Semester and its sections deleted successfully",
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

export const getSemestersByDepartment = async (req, res) => {
  try {
    const { id: departmentId } = req.params;

    const semesters = await Semester.find({ departmentId }).populate(
      "departmentId",
    );

    if (!semesters.length) {
      return res.status(200).json({
        message: "No semesters found for this department",
        data: { semesters: [] },
        code: 200,
      });
    }

    return res.status(200).json({
      message: "Semesters fetched successfully",
      data: { semesters },
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
