import React from "react";

function rulesPage() {
  return (
    <div className="">
      <header className="flex justify-center mt-4 text-white">
        <h1 className="text-2xl font-semibold">Rules and Regulations</h1>
      </header>

      <div className="flex gap-2">
        <main className="container mx-auto mt-6 p-4 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-4 text-center">For SMEs</h1>
          <section className="mb-8">
            <h2>Section 1: Introduction</h2>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Section 2: General Rules
            </h2>
            <ul className="list-disc pl-8">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Nullam ultricies, justo eu cursus bibendum.</li>
              <li>Proin ut augue ac urna dignissim dictum.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Section 3: Specific Rules
            </h2>
            <ol className="list-decimal pl-8">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Nullam ultricies, justo eu cursus bibendum.</li>
              <li>Proin ut augue ac urna dignissim dictum.</li>
            </ol>
          </section>
        </main>
        <main className="container mx-auto mt-6 p-4 bg-white rounded-lg shadow-lg">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Section 1: Introduction
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              ultricies, justo eu cursus bibendum.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Section 2: General Rules
            </h2>
            <ul className="list-disc pl-8">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Nullam ultricies, justo eu cursus bibendum.</li>
              <li>Proin ut augue ac urna dignissim dictum.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Section 3: Specific Rules
            </h2>
            <ol className="list-decimal pl-8">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Nullam ultricies, justo eu cursus bibendum.</li>
              <li>Proin ut augue ac urna dignissim dictum.</li>
            </ol>
          </section>
        </main>
      </div>
    </div>
  );
}

export default rulesPage;
