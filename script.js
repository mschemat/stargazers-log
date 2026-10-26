const repositoryList = document.querySelector("#repository-list");

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  for (const repository of repositories) {
    const item = document.createElement("li");
    item.className = "repository-card";

    const link = document.createElement("a");
    link.href = repository.url;
    link.textContent = repository.repository;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const description = document.createElement("p");
    description.textContent = repository.description;

    const date = document.createElement("time");
    date.dateTime = repository.starredAt;
    date.textContent = `Starred ${new Date(`${repository.starredAt}T00:00:00`).toLocaleDateString()}`;

    item.append(link, description, date);
    repositoryList.append(item);
  }
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const repositories = await response.json();
    renderRepositories(repositories);
  } catch (error) {
    console.error("Unable to load starred repositories:", error);
    const message = document.createElement("li");
    message.className = "status";
    message.textContent = "Repositories could not be loaded. Please try again later.";
    repositoryList.replaceChildren(message);
  }
}

loadRepositories();
