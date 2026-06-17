import React from 'react';

/**
 * Pulsing Skeleton block element.
 */
export const SkeletonBlock = ({ className = '' }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-2xl ${className}`} />
);

/**
 * Premium dashboard skeleton loading layout.
 */
export const DashboardSkeleton = () => {
  return (
    <div className="p-6 md:p-10 bg-slate-50 dark:bg-slate-950 min-h-screen font-inter space-y-10">
      {/* Header Loading State */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <SkeletonBlock className="h-8 w-64 md:w-80" />
          <SkeletonBlock className="h-4 w-40" />
        </div>
        <SkeletonBlock className="h-10 w-48 hidden md:block" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
            <SkeletonBlock className="w-10 h-10 rounded-xl" />
            <SkeletonBlock className="h-3 w-20" />
            <div className="flex items-end justify-between">
              <SkeletonBlock className="h-7 w-24" />
              <SkeletonBlock className="h-5 w-12 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Split Charts/Activities Grid Skeleton */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 space-y-8">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <SkeletonBlock className="h-5 w-32" />
              <SkeletonBlock className="h-3 w-24" />
            </div>
            <SkeletonBlock className="h-4 w-28" />
          </div>
          <SkeletonBlock className="h-[300px] w-full" />
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
            <SkeletonBlock className="h-4 w-32" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <SkeletonBlock className="w-10 h-10 rounded-xl shrink-0" />
                  <div className="space-y-2 flex-1">
                    <SkeletonBlock className="h-3 w-full" />
                    <SkeletonBlock className="h-2 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
            <SkeletonBlock className="h-4 w-32" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <SkeletonBlock key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Standard page fallbacks for nested routes.
 */
export const PageSkeleton = () => {
  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-3">
        <SkeletonBlock className="h-9 w-1/3" />
        <SkeletonBlock className="h-4 w-1/4" />
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2rem] p-6 space-y-6 shadow-sm">
            <SkeletonBlock className="h-40 w-full" />
            <div className="space-y-2">
              <SkeletonBlock className="h-5 w-3/4" />
              <SkeletonBlock className="h-3 w-1/2" />
            </div>
            <SkeletonBlock className="h-12 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageSkeleton;
