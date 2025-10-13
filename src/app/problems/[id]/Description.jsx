import React from "react";

const Description = ({ title, statement, constraints, example }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-[#1e1e1e] shadow-md rounded-lg p-6 overflow-y-auto">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      {/* Statement */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Problem Statement</h2>
        <p className="text-white whitespace-pre-line">{statement}</p>
      </div>

      {/* Examples */}
      {example?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Examples</h2>
          {example.map((ex, idx) => (
            <div
              key={idx}
              className="bg-[#373333] border rounded-2xl p-3 mb-3 text-sm"
            >
              <p>
                <span className="font-semibold">Input:</span> {ex.input}
              </p>
              <p>
                <span className="font-semibold">Output:</span> {ex.output}
              </p>
              {ex.explanation && (
                <p>
                  <span className="font-semibold">Explanation:</span>{" "}
                  {ex.explanation}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Constraints */}
      {constraints?.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Constraints</h2>
          <ul className="list-disc list-inside text-gray-400">
            {constraints.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Description;
