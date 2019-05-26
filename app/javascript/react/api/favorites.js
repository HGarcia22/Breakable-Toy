export const removeFavorite = recipeId =>
  fetch(`/api/v1/favorites/${recipeId}`, {
    credentials: "same-origin",
    method: "DELETE",
    body: JSON.stringify(recipeId),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
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
      return { favorited: false };
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));

export const addFavorite = recipeId =>
  fetch("/api/v1/favorites", {
    method: "POST",
    body: JSON.stringify(recipeId),
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
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
    .then(body => ({ favorited: true }))
    .catch(error => console.error(`Error in fetch: ${error.message}`));
