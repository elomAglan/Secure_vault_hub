'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useState } from 'react'
import { Camera, Lock, LogOut } from 'lucide-react'

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
  })

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData({ ...passwordData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Profile updated:', formData)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Password changed')
    setPasswordData({ current: '', new: '', confirm: '' })
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="mt-2 text-foreground/60">Manage your personal information</p>
        </div>

        {/* Profile Card */}
        <Card className="border border-border p-8">
          <h2 className="mb-6 text-xl font-semibold">Profile Information</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button variant="outline" className="gap-2">
                <Camera className="h-4 w-4" />
                Change Avatar
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>

            <Button>Save Changes</Button>
          </form>
        </Card>

        {/* Password Card */}
        <Card className="border border-border p-8">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
            <Lock className="h-5 w-5" />
            Change Password
          </h2>

          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <Label htmlFor="current">Current Password</Label>
              <Input
                id="current"
                name="current"
                type="password"
                value={passwordData.current}
                onChange={handlePasswordChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="new">New Password</Label>
              <Input
                id="new"
                name="new"
                type="password"
                value={passwordData.new}
                onChange={handlePasswordChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="confirm">Confirm New Password</Label>
              <Input
                id="confirm"
                name="confirm"
                type="password"
                value={passwordData.confirm}
                onChange={handlePasswordChange}
                className="mt-1"
              />
            </div>

            <Button disabled={!passwordData.current || !passwordData.new || !passwordData.confirm}>
              Update Password
            </Button>
          </form>
        </Card>

        {/* Sessions Card */}
        <Card className="border border-border p-8">
          <h2 className="mb-4 font-semibold">Active Sessions</h2>
          <p className="text-sm text-foreground/60 mb-4">
            You are currently logged in on this device. Sign out from other sessions if needed.
          </p>
          <Button variant="outline">Sign Out All Other Sessions</Button>
        </Card>

        {/* Logout Button */}
        <Button variant="destructive" className="w-full gap-2">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
