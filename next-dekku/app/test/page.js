export default function Test() {
  return (
    <div className="h-screen overflow-auto snap-y snap-mandatory">
      <section className="h-screen bg-red-500 flex items-center justify-center snap-start">
        <h1 className="text-white text-4xl">Section 1</h1>
      </section>
      <section className="h-screen bg-blue-500 flex items-center justify-center snap-start">
        <h1 className="text-white text-4xl">Section 2</h1>
      </section>
      <section className="h-screen bg-green-500 flex items-center justify-center snap-start">
        <h1 className="text-white text-4xl">Section 3</h1>
      </section>
    </div>
  );
}
