import {
  Calendar,
  CreditCard,
  Dot,
  FileText,
  FlaskConical,
  Hospital,
  LayoutDashboard,
  Shield,
  UserPlus,
  Users,
  UsersRound,
  Video,
} from "lucide-react";

export type GeneralLink = {
  label: string;
  href: string;
  icon: React.JSX.Element;
  end?: boolean;
  role?: string;
};

export type DropdownLink = {
  name: string;
  title: string;
  icon: React.JSX.Element;
  role?: string;
  links: GeneralLink[];
};

export const navGeneralLinks: GeneralLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    role: "admin",
    icon: <LayoutDashboard />,
    end: true,
  },
  {
    label: "Chatbot",
    href: "/dashboard/patient/chatbot",
    role: "user",
    icon: <Video />,
    end: true,
  },
  // Admin
  {
    label: "Payments",
    href: "/dashboard/admin/payments",
    role: "admin",

    icon: <CreditCard />,
    end: true,
  },
  {
    label: "Patients",
    href: "/dashboard/admin/patients",
    role: "admin",

    icon: <Users />,
    end: true,
  },
  {
    label: "Add Admin",
    href: "/dashboard/admin/admins/add",
    role: "admin",

    icon: <Shield />,
    end: true,
  },

  {
    label: "Appointments",
    href: "/dashboard/admin/appointments",
    role: "admin",
    icon: <Calendar />,
    end: true,
  },
  // Doctors
  {
    label: "My Appointments",
    href: "/dashboard/doctors/my-appointments",
    role: "doctor",
    icon: <Calendar />,
    end: true,
  },

  {
    label: "Patients",
    href: "/dashboard/doctors/patients",
    role: "doctor",
    icon: <UsersRound />,
    end: true,
  },
  {
    label: "Pharmacy",
    href: "/dashboard/medicines/",
    icon: <Hospital />,
    role: "doctor",
    end: true,
  },
  //
  {
    label: "Doctors",
    href: "/dashboard/patient/doctors",
    role: "user",
    icon: <Users />,
    end: true,
  },
  {
    label: "My Appointments",
    href: "/dashboard/patient/appointments",
    role: "user",
    icon: <Calendar />,
    end: true,
  },
  {
    label: "Lab tests",
    href: "/dashboard/patient/lab-tests",
    role: "user",
    icon: <FlaskConical />,
    end: true,
  },
  {
    label: "Medical records",
    href: "/dashboard/patient/medical-records",
    role: "user",
    icon: <FileText />,
    end: true,
  },
];

export const navDropDowns: DropdownLink[] = [
  {
    name: "doctor",
    title: "Doctors",
    icon: <Users />,
    role: "admin",
    links: [
      {
        label: "All Doctors",
        href: "/dashboard/admin/doctors/",
        icon: <Dot />,
      },
      {
        label: "Add Doctor",
        href: "/dashboard/admin/create",
        icon: <Dot />,
      },
    ],
  },
  // {
  //   name: "pharmacist",
  //   title: "Pharmacist",
  //   role: "doctor",
  //   icon: <Hospital />,
  //   links: [
  //     {
  //       label: "All Medicines",
  //       href: "/dashboard/medicines/",
  //       icon: <Dot />,
  //     },
  //     {
  //       label: "Add Medicine",
  //       href: "/dashboard/medicines/add",
  //       icon: <Dot />,
  //     },
  //     //   {
  //     //     label: "Appointment",
  //     //     href: "/dashboard/doctors",
  //     //     icon: <Dot />,
  //     //   },
  //   ],
  // },
  {
    name: "labTests",
    title: "Lab tests",
    role: "doctor",
    icon: <FlaskConical />,
    links: [
      {
        label: "All Lab tests",
        href: "/dashboard/doctors/lab-tests/",
        icon: <Dot />,
      },
      {
        label: "Add Lab test",
        href: "/dashboard/doctors/lab-tests/add",
        icon: <Dot />,
      },
      //   {
      //     label: "Appointment",
      //     href: "/dashboard/doctors",
      //     icon: <Dot />,
      //   },
    ],
  },
];
