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
      // if you want to remove keys, you can do
      // ({ unwantedKey, ...body }) =>
      // if there is nothing else in the body,
      return body;
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
