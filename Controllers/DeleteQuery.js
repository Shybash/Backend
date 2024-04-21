

const Query=require('../models/Query');

const DeleteQuery= async (id) => {
    try {
      // Find the query by ID and delete it
      const deletedQuery = await Query.findByIdAndDelete(id);
  
      if (!deletedQuery) {
        throw new Error('Query not found');
      }
  
      return { success: true };
    } catch (error) {
      console.error('Error deleting query:', error);
      throw new Error('An error occurred while deleting the query');
    }
  };

  module.exports=DeleteQuery;
  
  