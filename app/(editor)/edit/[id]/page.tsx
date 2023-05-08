import React from "react";

function page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Page: {params.id}</h1>
    </div>
  );
}

export default page;
