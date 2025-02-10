
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
const EmergencyRoutes = () => {
  const navigate = useNavigate();
  
    // Navigation handlers
    const handleNavigate = (path: string) => {
      navigate(path);
    };
  return (
    <div>
                <Card>
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                className="w-full p-3 bg-red-50 hover:bg-red-100 rounded-lg flex items-center space-x-2"
                onClick={() => handleNavigate("/ambulance")}
              >
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <div>
                  <div className="mt-1 text-sm text-red-600">
                    Request Emergency Medical Help
                  </div>
                </div>
              </Button>

              <Button
                className="w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center space-x-2"
                onClick={() => handleNavigate("/police")}
              >
                <Shield className="w-4 h-4 text-blue-500" />
                <div>
                  <div className="mt-1 text-sm text-blue-600">
                    Request Police Assistance
                  </div>
                </div>
              </Button>

              <Button
                className="w-full p-3 bg-orange-50 hover:bg-orange-100 rounded-lg flex items-center space-x-2"
                onClick={() => handleNavigate("/fire")}
              >
                <Flame className="w-4 h-4 text-orange-500" />
                <div>
                  <div className="mt-1 text-sm text-orange-600">
                     Fire Emergency Service
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
    </div>
  )
}

export default EmergencyRoutes