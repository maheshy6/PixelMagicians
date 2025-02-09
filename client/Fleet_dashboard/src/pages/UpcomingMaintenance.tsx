
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  DollarSign, 
  Settings,
  RotateCw
} from "lucide-react";

interface Vehicle {
  id: string;
  status: 'Active' | 'Due Soon';
  lastService: string;
  nextDue: string;
}

interface MaintenanceTask {
  type: string;
  vehicleId: string;
  dueDate: string;
  timeLeft: string;
}

const UpcomingMaintenance = () => {
  const stats = [
    { title: "Pending Services", value: 12, icon: Clock, className: "bg-blue-50 text-blue-700" },
    { title: "Completed", value: 45, icon: CheckCircle, className: "bg-green-50 text-green-700" },
    { title: "Overdue", value: 3, icon: AlertTriangle, className: "bg-red-50 text-red-700" },
    { title: "Monthly Cost", value: "$12,450", icon: DollarSign, className: "bg-purple-50 text-purple-700" },
  ];

  const vehicles: Vehicle[] = [
    { id: "Truck #1234", status: "Active", lastService: "Jan 15, 2025", nextDue: "Mar 15, 2025" },
    { id: "Truck #1235", status: "Due Soon", lastService: "Feb 1, 2025", nextDue: "Mar 1, 2025" },
  ];

  const maintenanceTasks: MaintenanceTask[] = [
    { type: "Oil Change", vehicleId: "Truck #1234", dueDate: "Mar 15, 2025", timeLeft: "2 weeks left" },
    { type: "Tire Rotation", vehicleId: "Truck #1235", dueDate: "Mar 1, 2025", timeLeft: "1 week left" },
  ];

  return (
    <div className="p-6 space-y-6 bg-background">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Fleet Maintenance Dashboard</h1>
        <p className="text-muted-foreground">Overview of your fleet's maintenance status</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="flex items-center p-6">
              <div className={`p-2 rounded-lg ${stat.className} dark:bg-opacity-10`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vehicle Status Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Maintenance Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50">
                <tr>
                  <th className="px-6 py-3">VEHICLE</th>
                  <th className="px-6 py-3">STATUS</th>
                  <th className="px-6 py-3">LAST SERVICE</th>
                  <th className="px-6 py-3">NEXT DUE</th>
                  <th className="px-6 py-3">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b">
                    <td className="px-6 py-4 flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      {vehicle.id}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        vehicle.status === 'Active' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100'
                      }`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{vehicle.lastService}</td>
                    <td className="px-6 py-4">{vehicle.nextDue}</td>
                    <td className="px-6 py-4">
                      <Button variant="link" className="text-blue-600 dark:text-blue-400">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Maintenance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {maintenanceTasks.map((task) => (
              <div key={`${task.vehicleId}-${task.type}`} className="flex items-center p-4 border rounded-lg">
                <div className="p-2 bg-blue-50 rounded-lg dark:bg-blue-900">
                  {task.type === "Oil Change" ? (
                    <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <RotateCw className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-semibold">{task.type}</h4>
                  <p className="text-sm text-muted-foreground">{task.vehicleId}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{task.dueDate}</p>
                  <p className="text-sm text-muted-foreground">{task.timeLeft}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpcomingMaintenance;

