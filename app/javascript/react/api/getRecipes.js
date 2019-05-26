export const getRecipes = recipeId =>
  fetch(`/api/v1/recipes/${recipeId}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status}(${response.statusText})`,
          error = new Error(errorMessage);
        throw error;
      }
    })
    .then(response => response.json())
    .then(body => {
      return body;
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
