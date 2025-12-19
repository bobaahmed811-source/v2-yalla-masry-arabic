'use client';

// This is a minimal, barebones page for the skeleton build.
// Its only purpose is to confirm that the project's core configuration
// can be successfully built and deployed on Vercel.

export default function Home() {
  return (
    <main
      dir="rtl"
      className="flex min-h-screen flex-col items-center justify-center p-24 bg-nile-dark text-white"
    >
      <h1 className="text-4xl font-bold royal-title">بناء الهيكل الأساسي</h1>
      <p className="mt-4 text-lg">
        إذا رأيت هذه الصفحة، فهذا يعني أن عملية النشر الأساسية قد نجحت.
      </p>
    </main>
  );
}
