// app/api/note/[id]/route.js
import database from '../../../../lib/db';

export async function GET(request,{ params }) {
    try {
      const { id } = await params;
  
      console.log('Params:', params);
      const response = await database.query("SELECT * FROM notes WHERE id=$1", [id]);
      console.log('Database Response:', response.rows);
      
      if (response.rows.length === 0) {
        return new Response(
          JSON.stringify({ message: `Note with id ${id} not found.` }),
          { 
            status: 404, 
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
  
      const note = response.rows[0];
  
     
      return new Response(
        JSON.stringify(note),
        { 
          status: 200, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
  
    } catch (error) {
      console.error('Error retrieving note:', error);
  
      return new Response(
        JSON.stringify({ message: 'Error retrieving note', error: error.message }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }

export async function PUT(request,{params}){
    try {
      const { id } = await params;
      const { title, content } = await request.json();
      
      const response = await database.query("SELECT * FROM notes WHERE id=$1",[id]);
      
      if (!response.rows[0]){
        return new Response(
          JSON.stringify({ message: `Note with id ${id} doesn't exist in the database` }),
          { 
            status: 404, 
            headers: { 'Content-Type': 'application/json' } 
          }
        );
      }
    
      if (!title || !content){
        return new Response(
          JSON.stringify({message:'Error creating Note. Either title or content are missing.'}),
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json' } 
          }
        )
      }
        
      const result = await database.query(
        "UPDATE notes SET title=$1, content=$2 WHERE id=$3 RETURNING *", 
        [title,content,id,]
        );
      const updatedResult = result.rows[0];
    
      return new Response(
        JSON.stringify({
          message: 'Note updated successfully',
          updatedNote: updatedResult,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
  
    } catch (error) {
      console.error('Error updating note:', error);
      return new Response(
        JSON.stringify({ message: 'Error updating note', error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
  }

export async function PATCH(request,{params}) {
    try{
        const { id } =  await params;
        const { title, content } = await request.json();

        const response = await database.query("SELECT * FROM notes WHERE id=$1",[id]);
        
        if (!response.rows[0]){
        return new Response(
            JSON.stringify({ message: `Note with id ${id} doesn't exist in the database` }),
            { 
            status: 404, 
            headers: { 'Content-Type': 'application/json' } 
            }
        );
        }

        if (!title && !content) {
            return new Response(
            JSON.stringify({
                message: "Note hasn't changed, no data to modify",
                note: response.rows[0],
            }),
            { 
                status: 400, 
                headers: { 'Content-Type': 'application/json' }
            }
            );
        }
    
        const updatedFields = [];
        const queryValues = [];

        if (title) {
            updatedFields.push(`title=$${queryValues.length + 1}`);
            queryValues.push(title);
          }
        if (content) {
            updatedFields.push(`content=$${queryValues.length + 1}`);
            queryValues.push(content);
        }
    
        queryValues.push(id);

        const queryStr = `UPDATE notes SET ${updatedFields.join(", ")} WHERE id=$${queryValues.length} RETURNING *`;
        const result = await database.query(queryStr, queryValues);

        const updatedNote = result.rows[0];
    
        return new Response(
            JSON.stringify({
            message: 'Note updated successfully',
            updatedNote: updatedNote,
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error updating note:', error);
        return new Response(
          JSON.stringify({ message: 'Error updating note', error: error.message }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
      
      const { id } = await params;

      const response = await database.query("SELECT * FROM notes WHERE id=$1", [id]);
      if (response.rows.length === 0) {
        return new Response(
          JSON.stringify({ message: `Note with id ${id} not found.` }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
  
      await database.query("DELETE FROM notes WHERE id=$1", [id]);
      return new Response(
        JSON.stringify({ message: `Note with id ${id} has been deleted.` }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('Error deleting note:', error);
  
      return new Response(
        JSON.stringify({ message: 'Error deleting note', error: error.message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }
