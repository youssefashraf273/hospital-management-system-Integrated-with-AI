import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthCtx } from "@/context/authContext";
import { CalendarIcon, ClipboardList, Users, Activity, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboardPage() {
  const { user } = useAuthCtx();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name} . Here's an overview of your practice.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-primary">+2 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medical Records</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Updated this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Lab Tests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 urgent</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your schedule for today and tomorrow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 rounded-md border p-4"
                >
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Ahmed Ali</p>
                    <p className="text-xs text-muted-foreground">General Checkup</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {i === 1
                        ? "Today, 10:00 AM"
                        : i === 2
                        ? "Today, 2:30 PM"
                        : "Tomorrow, 9:15 AM"}
                    </span>
                  </div>
                </div>
              ))}
              <div className="text-center">
                <Link
                  to="/dashboard/admin/appointments"
                  className="text-sm text-primary hover:underline"
                >
                  View all appointments
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link
                to="/dashboard/admin/patients"
                className="block w-full rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                View All Patients
              </Link>
              <Link
                to="/dashboard/admin/appointments/today"
                className="block w-full rounded-md border border-input bg-background px-4 py-2 text-center text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Today's Schedule
              </Link>
              <Link
                to="/dashboard/admin/doctors/add"
                className="block w-full rounded-md border border-input bg-background px-4 py-2 text-center text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Add new doctor
              </Link>{" "}
              <Link
                to="/dashboard/admin/admins/add"
                className="block w-full rounded-md border border-input bg-background px-4 py-2 text-center text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Add new Admin
              </Link>
              <Link
                to="/dashboard/admin/payments"
                className="block w-full rounded-md border border-input bg-background px-4 py-2 text-center text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                View Payments
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
