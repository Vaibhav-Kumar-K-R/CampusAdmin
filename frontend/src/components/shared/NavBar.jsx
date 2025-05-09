import { forwardRef } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.jsx";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout } from "@/redux/authSlice";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const collegeERP = [
    {
      title: "Admin & Department Management",
      description:
        "Handles the structure of the institution, including department creation, role assignments, and administrative controls.",
    },
    {
      title: "Semester & Course Management",
      description:
        "Manages academic sessions, course registrations, syllabus distribution, and scheduling.",
    },
    {
      title: "Faculty & Student Management",
      description:
        "Maintains faculty profiles, student records, and role-based access to information and resources.",
    },
    {
      title: "Attendance & Marks Management",
      description:
        "Automates attendance tracking, marks entry, and report generation for academic performance analysis.",
    },
  ];

  return (
    <div
      style={{ border: "none" }}
      className="w-full bg-gradient-to-r from-[#048c7f] to-[#037c6e] sticky top-0 z-50 shadow-md"
    >
      <div
        style={{ border: "none" }}
        className="lg:max-w-[1400px] m-auto flex justify-between items-center gap-2 p-4 h-[4.5rem]"
      >
        <div className="flex justify-center items-center">
          <NavigationMenu style={{ border: "none" }}>
            <NavigationMenuList style={{ border: "none" }}>
              <NavigationMenuItem>
                <Link to="/" className="text-2xl font-bold text-white mr-8">
                  Campus<span className="font-extrabold">Admin</span>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem style={{ border: "none" }}>
                <NavigationMenuTrigger
                  style={{ border: "none" }}
                  className="text-white px-4 py-1  transition [&>svg]:text-white bg-white/10 hover:bg-white/20 border-none"
                >
                  <span className="text-white text-[15px] border-none">
                    Getting Started
                  </span>
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  className="bg-[#048c7f] text-white p-4"
                  style={{ border: "none" }}
                >
                  <ul className="grid gap-3 dw-[250px] md:w-[300px] lg:w-[300px] lg:grid-cols-1">
                    <ListItem
                      onClick={(e) => {
                        document
                          .getElementById("getstarted")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      title="Student Portal"
                      className="text-gray-200 text-xl border  hover:scale-105 hover:opacity-100 hover:text-white "
                    >
                      Access your courses, assignments, study tools, and more.
                    </ListItem>
                    <ListItem
                      onClick={(e) => {
                        document
                          .getElementById("getstarted")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      title="Faculty Portal"
                      className="text-gray-200 border hover:scale-105 hover:text-white  "
                    >
                      Manage courses, student progress, and analytics.
                    </ListItem>
                    <ListItem
                      onClick={(e) => {
                        document
                          .getElementById("getstarted")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      title="Admin Panel"
                      className="text-gray-200 border hover:scale-105 hover:text-white "
                    >
                      Oversee campus activities and institution-wide analytics.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {user && (
                <NavigationMenuItem className="hidden bg-[#048c7f] sm:flex justify-center items-center">
                  {user.role === "Admin" && (
                    <Link
                      className="text-white mr-3  px-4 py-2"
                      to={"/admin-dashboard"}
                    >
                      Dashboard
                    </Link>
                  )}
                  {user.role === "Faculty" && (
                    <Link
                      className="text-white mr-3 px-4 py-2"
                      to={"/faculty-dashboard"}
                    >
                      Dashboard
                    </Link>
                  )}
                  {user.role === "Student" && (
                    <Link
                      className="text-white mr-3  px-4 py-2"
                      to={"/student-dashboard"}
                    >
                      Dashboard
                    </Link>
                  )}
                </NavigationMenuItem>
              )}

              {!user && (
                <NavigationMenuItem className="hidden sm:flex justify-center items-center">
                  <Link
                    className="text-white mr-3  px-4 py-2"
                    href={"#dashboard"}
                    onClick={(e) => {
                      document
                        .getElementById("dashboard")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Dashboard
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {user && (
          <Sheet onOpenChange={setIsOpen}>
            <SheetTrigger>
              <div className="sm:hidden">
                <div
                  className="flex flex-col justify-between w-6 h-4 group"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span
                    className={`h-[2px] w-full bg-white rounded transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2.5" : ""}`}
                  ></span>
                  <span
                    className={`h-[2px] w-full bg-white rounded transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
                  ></span>
                  <span
                    className={`h-[2px] w-full bg-white rounded transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
                  ></span>
                </div>
              </div>
            </SheetTrigger>
            <SheetContent className="sm:hidden bg-white text-white w-64 h-full p-4">
              <SheetHeader>
                <SheetTitle className="text-lg font-bold text-white">
                  CampusAdmin
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4 flex bg-[#048c7f] justify-between gap-5 text-white  p-4 border border-white/20 rounded-t-xl ">
                <div className="flex flex-col  justify-start items-center gap-2">
                  <div>
                    <Avatar className="w-14 h-15 border-2 border-white/20">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>Profile</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    {user?.role === "Admin" && (
                      <Badge className="bg-white text-[#048c7f]">Admin</Badge>
                    )}
                    {user?.role === "Student" && (
                      <Badge className="bg-white text-[#048c7f]">Student</Badge>
                    )}
                    {user?.role === "Faculty" && (
                      <Badge className="bg-white text-[#048c7f]">Faculty</Badge>
                    )}
                  </div>
                  <div  >
                    {user.role == "Admin" && (
                      <Badge className="bg-white text-[#048c7f]">
                        {user.institutionDomain}
                      </Badge>
                    )}
                    {user.role == "Student" && (
                      <Badge className="bg-white text-[#048c7f]">
                        {user.departmentId.name}
                      </Badge>
                    )}
                    {user.role == "Faculty" && (
                      <Badge className="bg-white text-[#048c7f]">
                        {user.departmentId.name}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="bg-white text-[#048c7f] p-1 rounded-lg text-center">
                    {user.firstName + " " + user.lastName}
                  </span>

                  <span className="bg-white text-[#048c7f] text-sm text-center p-1 rounded-lg">
                    {user && user.role === "Admin"
                      ? user.institutionName.length > 15
                        ? user.institutionName.substring(0, 12) + "..."
                        : user.institutionName
                      : user.departmentId.length > 15
                        ? user.departmentId.substring(0, 12) + "..."
                        : user.departmentId}
                  </span>
                </div>
              </div>
              <nav className="bg-[#048c7f] w-full m-auto rounded-b-2xl pt-6 text-center pb-6">
                <ul className="space-y-4">
                  {user && user.role === "Admin" && (
                    <Link to={"/admin-dashboard"}>
                      <li className="bg-whiteshadow-lg bg-white text-[#048c7f] w-[90%] m-auto  p-3 rounded-lg cursor-pointer">
                        Dashboard
                      </li>
                    </Link>
                  )}
                  {user && user.role === "Student" && (
                    <Link to={"/student-dashboard"}>
                      <li className=" shadow-lg w-[90%] bg-white text-[#048c7f] m-auto  p-3 rounded-lg cursor-pointer">
                        Dashboard
                      </li>
                    </Link>
                  )}
                  {user && user.role === "Faculty" && (
                    <Link to={"/faculty-dashboard"}>
                      <li className=" shadow-lg w-[90%] m-auto bg-white text-[#048c7f]  p-3 rounded-lg cursor-pointer">
                        Dashboard
                      </li>
                    </Link>
                  )}

                  <li className=" w-[90%] m-auto bg-white text-[#048c7f]  p-3 rounded-lg cursor-pointer">
                    Profile
                  </li>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <li className="bg-red-700 w-[90%] m-auto hover:bg-red-900 p-3 rounded-lg cursor-pointer">
                        Logout
                      </li>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle>
                          Are you sure you want to logout?
                        </DialogTitle>
                        <DialogDescription>
                          You will be logged out and redirected to the home
                          page.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-2 mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-red-600 text-white hover:bg-red-800"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        )}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer hidden sm:block focus:outline-none">
              <div>
                <Avatar className="w-11 h-11 border-2 border-white/20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>Profile</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 flex-col justify-between gap-5 bg-slate-200 text-white cursor-pointer border border-white/20">
              <div className="flex flex-col justify-start items-center gap-2">
                <div>
                  <Avatar className="w-14 h-15 border-2 border-white/20">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>Profile</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  {user && user.role === "Admin" && (
                    <Badge className="bg-[#048c7f]">Admin</Badge>
                  )}
                  {user && user.role === "Student" && (
                    <Badge className="bg-[#048c7f]">Student</Badge>
                  )}
                  {user && user.role === "Faculty" && (
                    <Badge className="bg-[#048c7f]">Faculty</Badge>
                  )}
                </div>
                <div>
                  <Badge className="bg-[#048c7f] text-wrap">
                    {user.institutionDomain}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <span className="bg-[#048c7f] p-1 rounded-lg text-center">
                  {user.firstName + " " + user.lastName}
                </span>
              </div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <div
                    className="bg-red-700 p-1 rounded-lg text-center hover:bg-red-900 cursor-pointer mt-2"
                    onClick={() => setOpen(true)}
                  >
                    Logout
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Are you sure you want to logout?</DialogTitle>
                    <DialogDescription>
                      You will be logged out and redirected to the home page.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      className="bg-red-600 text-white hover:bg-red-800"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

const ListItem = forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
