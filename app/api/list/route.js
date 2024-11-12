import database from "../../../lib/db";

export async function GET() {
  const response = await database.query("SELECT * FROM todos ORDER BY id ASC");
  const items = response.rows;
  return new Response(JSON.stringify(items), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { content } = data;
    if (!content) {
      return new Response(
        JSON.stringify({ message: "Error adding item: Content is required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const result = await database.query(
      "INSERT INTO todos (content) VALUES ($1) RETURNING *",
      [content]
    );
    const newItem = result.rows[0];

    return new Response(
      JSON.stringify({ message: "Item created successfully", item: newItem }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating item:", error);
    return new Response(JSON.stringify({ message: "Error creating item" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request) {
  try {
    await database.query("DELETE FROM todos");
    return new Response(
      JSON.stringify({ message: "All items have been deleted." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting all items:", error);
    return new Response(
      JSON.stringify({
        message: "Error deleting all items",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
