'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Shield, Users, Contact, Users2, Star } from 'lucide-react';
import Link from 'next/link';
import { getUsers, getPods, getExchangeTrends, type User, type Pod } from '@/lib/data';
import { Bar, BarChart as RechartsBarChart, Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export default function AdminDashboardPage() {
  const users = useMemo(() => getUsers(), []);
  const pods = useMemo(() => getPods(), []);
  const exchangeTrends = useMemo(() => getExchangeTrends(), []);

  const popularSkills = useMemo(() => {
    const skillCount: { [key: string]: number } = {};
    users.forEach(user => {
      user.skillsOffered.forEach(skill => {
        skillCount[skill.name] = (skillCount[skill.name] || 0) + 1;
      });
    });
    return Object.entries(skillCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [users]);

  const activePods = useMemo(() => {
    return [...pods]
      .sort((a, b) => b.members.length - a.members.length)
      .slice(0, 5)
      .map(pod => ({ name: pod.name, members: pod.members.length }));
  }, [pods]);
  
  const chartConfig: ChartConfig = {
    count: { label: 'Users' },
    members: { label: 'Members' },
    swaps: { label: 'Swaps', color: 'hsl(var(--primary))' },
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline text-foreground/90 flex items-center gap-2">
          <Shield className="text-primary" />
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">Manage users, pods, and view platform analytics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pods</CardTitle>
            <Contact className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pods.length}</div>
            <p className="text-xs text-muted-foreground">+1 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Content</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Reviews awaiting moderation</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
         <Card>
          <CardHeader>
            <CardTitle>Popular Skills</CardTitle>
            <CardDescription>Top 5 skills offered by users.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <RechartsBarChart data={popularSkills} layout="vertical" margin={{ left: 20 }}>
                 <CartesianGrid horizontal={false} />
                <XAxis type="number" dataKey="count" hide/>
                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={120} />
                <ChartTooltip
                    cursor={{fill: 'hsl(var(--muted))'}}
                    content={<ChartTooltipContent />}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Most Active Pods</CardTitle>
            <CardDescription>Top 5 pods by member count.</CardDescription>
          </CardHeader>
           <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <RechartsBarChart data={activePods} layout="vertical" margin={{ left: 20 }}>
                 <CartesianGrid horizontal={false} />
                <XAxis type="number" dataKey="members" hide/>
                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={120} />
                <ChartTooltip
                    cursor={{fill: 'hsl(var(--muted))'}}
                    content={<ChartTooltipContent />}
                />
                <Bar dataKey="members" fill="hsl(var(--primary))" radius={4} />
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle>Exchange Trends</CardTitle>
            <CardDescription>Mock data showing skill swaps over the past week.</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <LineChart data={exchangeTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="swaps" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
            </ChartContainer>
        </CardContent>
       </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage all users on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserManagementTable users={users} />
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
          <CardTitle>Pod Moderation</CardTitle>
          <CardDescription>View and moderate all community pods.</CardDescription>
        </CardHeader>
        <CardContent>
          <PodManagementTable pods={pods} />
        </CardContent>
      </Card>

    </div>
  );
}

function UserManagementTable({ users }: { users: User[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="hidden md:table-cell">Trust Score</TableHead>
                    <TableHead className="hidden md:table-cell">Pods</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map(user => (
                    <TableRow key={user.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.dataAiHint} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{user.name}</div>
                            </div>
                        </TableCell>
                        <TableCell>{user.location}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.trustScore}</TableCell>
                        <TableCell className="hidden md:table-cell">{user.pods.length}</TableCell>
                        <TableCell className="text-right">
                           <Button asChild variant="ghost" size="sm">
                             <Link href={`/profile/${user.id}`}>View</Link>
                           </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

function PodManagementTable({ pods }: { pods: Pod[] }) {
    return (
         <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Pod</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead className="hidden md:table-cell">Tags</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {pods.map(pod => (
                    <TableRow key={pod.id}>
                        <TableCell className="font-medium">{pod.name}</TableCell>
                        <TableCell>{pod.members.length}</TableCell>
                        <TableCell className="hidden md:table-cell">
                            <div className="flex flex-wrap gap-1">
                                {pod.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                            </div>
                        </TableCell>
                         <TableCell className="text-right">
                           <Button asChild variant="ghost" size="sm">
                             <Link href={`/pods/${pod.id}`}>View</Link>
                           </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
