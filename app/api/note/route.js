// app/api/note/route.js
import database from '../../../lib/db';

export async function GET() {
  const response = await database.query("SELECT * FROM notes ORDER BY id ASC");
  const notes = response.rows;
  return new Response(JSON.stringify(notes), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  try {
  const data = await request.json();
  const { title, content } = data;

  if (!title && !content) {
    return new Response(
      JSON.stringify({ message: 'Either title or content is required' }),
      { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }

  const result = await database.query(
    'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
    [title || null, content || null]
  );
  const newNote = result.rows[0];

  return new Response(
    JSON.stringify({ message: 'Note created successfully', note: newNote }),
    { status: 201, headers: { 'Content-Type': 'application/json' } }
  );
  } catch (error) {
    console.error('Error creating note:', error);
    return new Response(
      JSON.stringify({ message: 'Error creating note' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(request) {
  try {
    
    await database.query("DELETE FROM notes");

    return new Response(
      JSON.stringify({ message: 'All notes have been deleted.' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error deleting all notes:', error);

    return new Response(
      JSON.stringify({ message: 'Error deleting all notes', error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
