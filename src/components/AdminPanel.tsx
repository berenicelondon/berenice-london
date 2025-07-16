"use client"

import { useState } from "react"
import { useAdmin } from "@/contexts/AdminContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Users,
  BookOpen,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Mail,
  CreditCard,
  Crown,
  Search,
  Filter,
  Download
} from "lucide-react"
import { blogPosts, blogCategories, type BlogPost, type BlogCategory } from "@/data/blogData"
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard"
import { EnvironmentStatus } from "@/components/EnvironmentStatus"
import Link from "next/link"

// Mock data for demonstration
const mockMembers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', membershipType: 'premium', joinDate: '2024-01-15', status: 'active' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', membershipType: 'basic', joinDate: '2024-01-10', status: 'active' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com', membershipType: 'elite', joinDate: '2024-01-08', status: 'suspended' },
  { id: '4', name: 'David Wilson', email: 'david@example.com', membershipType: 'premium', joinDate: '2024-01-05', status: 'active' }
]

const mockBookings = [
  { id: 'BL-001234', customerName: 'Alice Johnson', service: 'Bespoke Wig Consultation', date: '2024-01-25', time: '14:00', status: 'confirmed', amount: '£150' },
  { id: 'BL-001235', customerName: 'Bob Smith', service: 'Styling Session', date: '2024-01-26', time: '10:30', status: 'pending', amount: '£75' },
  { id: 'BL-001236', customerName: 'Carol Davis', service: 'Initial Consultation', date: '2024-01-27', time: '16:00', status: 'confirmed', amount: 'Free' },
  { id: 'BL-001237', customerName: 'David Wilson', service: 'Maintenance & Care', date: '2024-01-28', time: '11:00', status: 'completed', amount: '£50' }
]

export function AdminPanel() {
  const { admin, adminLogout, hasPermission } = useAdmin()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  if (!admin) return null

  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'elite': return 'bg-purple-100 text-purple-800'
      case 'premium': return 'bg-amber-100 text-amber-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Dashboard Overview
  const DashboardTab = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogPosts.length}</div>
            <p className="text-xs text-muted-foreground">+2 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookings Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 pending approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£12,450</div>
            <p className="text-xs text-muted-foreground">+23% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New member registered</p>
                <p className="text-xs text-gray-500">Alice Johnson - Premium membership</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Booking confirmed</p>
                <p className="text-xs text-gray-500">Bespoke consultation for tomorrow</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Blog post published</p>
                <p className="text-xs text-gray-500">"Spring 2024 Collection Preview"</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create New Blog Post
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              View Today's Bookings
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Newsletter
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Members Management Tab
  const MembersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Member Management</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search members..."
              className="pl-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Membership</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getMembershipColor(member.membershipType)}>
                    {member.membershipType}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )

  // Blog Management Tab
  const BlogTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {post.featured && <Crown className="h-4 w-4 text-amber-500" />}
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <p className="text-sm text-gray-500">{post.readTime} min read</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{post.category}</Badge>
                </TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{new Date(post.publishDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800">Published</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )

  // Bookings Management Tab
  const BookingsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Booking Management</h2>
        <div className="flex gap-2">
          <Button variant="outline">Today</Button>
          <Button variant="outline">This Week</Button>
          <Button>Export</Button>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-mono">{booking.id}</TableCell>
                <TableCell>{booking.customerName}</TableCell>
                <TableCell>{booking.service}</TableCell>
                <TableCell>
                  <div>
                    <p>{new Date(booking.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500">{booking.time}</p>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{booking.amount}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Mail className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Crown className="h-8 w-8 text-amber-700" />
                <span className="text-xl font-bold">Berenice Admin</span>
              </Link>
              <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                {admin.role.replace('_', ' ')}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">Welcome, {admin.name}</span>
              <Button variant="outline" onClick={adminLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 lg:grid-cols-6 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            {hasPermission('manage_users') && (
              <TabsTrigger value="members" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Members
              </TabsTrigger>
            )}
            {hasPermission('manage_posts') && (
              <TabsTrigger value="blog" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Blog
              </TabsTrigger>
            )}
            {hasPermission('manage_bookings') && (
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Bookings
              </TabsTrigger>
            )}
            {hasPermission('view_analytics') && (
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            )}
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab />
          </TabsContent>

          {hasPermission('manage_users') && (
            <TabsContent value="members">
              <MembersTab />
            </TabsContent>
          )}

          {hasPermission('manage_posts') && (
            <TabsContent value="blog">
              <BlogTab />
            </TabsContent>
          )}

          {hasPermission('manage_bookings') && (
            <TabsContent value="bookings">
              <BookingsTab />
            </TabsContent>
          )}

          {hasPermission('view_analytics') && (
            <TabsContent value="analytics">
              <AnalyticsDashboard />
            </TabsContent>
          )}

          <TabsContent value="settings">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">System Settings</h2>
              <EnvironmentStatus />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
