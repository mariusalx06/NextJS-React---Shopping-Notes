import database from "../../../../lib/db";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const response = await database.query("SELECT * FROM todos WHERE id=$1", [
      id,
    ]);
    if (response.rows.length === 0) {
      return new Response(
        JSON.stringify({ message: `Item with id ${id} not found.` }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const item = response.rows[0];

    return new Response(JSON.stringify(item), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error retrieving item:", error);
    return new Response(
      JSON.stringify({
        message: "Error retrieving item",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { content } = await request.json();
    const response = await database.query("SELECT * FROM todos WHERE id=$1", [
      id,
    ]);

    if (!response.rows[0]) {
      return new Response(
        JSON.stringify({
          message: `Item with id ${id} doesn't exist in the database`,
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!content) {
      return new Response(
        JSON.stringify({
          message: "Error creating Item. Content is required.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await database.query(
      "UPDATE todos SET content=$1 WHERE id=$2 RETURNING *",
      [content, id]
    );
    const updatedResult = result.rows[0];
    return new Response(
      JSON.stringify({
        message: "Item updated successfully",
        updatedItem: updatedResult,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating item:", error);
    return new Response(
      JSON.stringify({ message: "Error updating item", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const { content } = await request.json();
    const response = await database.query("SELECT * FROM todos WHERE id=$1", [
      id,
    ]);

    if (!response.rows[0]) {
      return new Response(
        JSON.stringify({
          message: `Item with id ${id} doesn't exist in the database`,
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!content) {
      return new Response(
        JSON.stringify({
          message: "Error creating Item. Content is required.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await database.query(
      "UPDATE todos SET content=$1 WHERE id=$2 RETURNING *",
      [content, id]
    );
    const updatedResult = result.rows[0];
    return new Response(
      JSON.stringify({
        message: "Item updated successfully",
        updatedItem: updatedResult,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating item:", error);
    return new Response(
      JSON.stringify({ message: "Error updating item", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const response = await database.query("SELECT * FROM todos WHERE id=$1", [
      id,
    ]);
    if (response.rows.length === 0) {
      return new Response(
        JSON.stringify({ message: `Item with id ${id} not found.` }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await database.query("DELETE FROM todos WHERE id=$1", [id]);
    return new Response(
      JSON.stringify({ message: `Item with id ${id} has been deleted.` }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error deleting item:", error);
    return new Response(
      JSON.stringify({ message: "Error deleting item", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
