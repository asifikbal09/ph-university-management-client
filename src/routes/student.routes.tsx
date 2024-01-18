import OfferedCourse from "../student/OfferedCourse";
import StudentDashboard from "../student/StudentDashboard";

export const studentPath = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard></StudentDashboard>,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferedCourse></OfferedCourse>,
  },
];
