'use client';

import type { NextPage } from 'next';
import { useUser } from '@/firebase';

import { courses } from '@/lib/data';
import { MainLayout } from '@/components/layout/main-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { CourseCard } from '@/components/dashboard/course-card';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardPage: NextPage = () => {
  const { user, isUserLoading } = useUser();

  const userName = user?.displayName || user?.email || 'Student';

  return (
    <MainLayout>
      {isUserLoading ? (
        <div className="flex items-center justify-between mb-6">
          <div>
            <Skeleton className="h-9 w-64 mb-2" />
            <Skeleton className="h-5 w-80" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      ) : (
        <DashboardHeader userName={userName} />
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
