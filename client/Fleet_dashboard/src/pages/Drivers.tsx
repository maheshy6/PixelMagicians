import  { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Phone,
  Car,
  Calendar,
  Search,
  Plus,
  Download,
  Eye,
  Edit
} from "lucide-react";

interface Driver {
  id: string;
  name: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  vehicle: string;
  performanceScore: number;
  licenseExpiry: string;
  image: string;
}

const DriverManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const drivers: Driver[] = [
    {
      id: 'DRV-2025-001',
      name: 'John Anderson',
      phone: '+1 (555) 123-4567',
      status: 'Active',
      vehicle: 'TRK-2025-089',
      performanceScore: 92,
      licenseExpiry: 'Aug 15, 2025',
      image: '/api/placeholder/40/40'
    },
    {
      id: 'DRV-2025-002',
      name: 'Sarah Johnson',
      phone: '+1 (555) 987-6543',
      status: 'On Leave',
      vehicle: 'TRK-2025-092',
      performanceScore: 78,
      licenseExpiry: 'Oct 20, 2025',
      image: '/api/placeholder/40/40'
    },
    {
      id: 'DRV-2025-003',
      name: 'Michael Chen',
      phone: '+1 (555) 456-7890',
      status: 'Active',
      vehicle: 'TRK-2025-095',
      performanceScore: 88,
      licenseExpiry: 'Dec 05, 2025',
      image: '/api/placeholder/40/40'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100';
      case 'Inactive':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         driver.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 bg-background">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Driver Management</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> Add Driver
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            placeholder="Search drivers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select
            className="border rounded-md px-3 py-2 bg-background"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
          
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDrivers.map((driver) => (
          <Card key={driver.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <img
                    src={driver.image}
                    alt={driver.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{driver.name}</h3>
                    <p className="text-sm text-muted-foreground">{driver.id}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(driver.status)}`}>
                  {driver.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  {driver.phone}
                </div>
                <div className="flex items-center text-sm">
                  <Car className="w-4 h-4 mr-2 text-muted-foreground" />
                  Vehicle: {driver.vehicle}
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                  License expires: {driver.licenseExpiry}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Performance Score</span>
                  <span className="text-sm font-medium">{driver.performanceScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${driver.performanceScore}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" /> View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" /> Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DriverManagement;