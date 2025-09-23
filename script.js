$(document).ready(function () {

  // Add Item (Activity / Goal / Achievement)
  $(".add-btn").click(function () {
    let inputs = $(this).siblings("input");
    let inputText = inputs.map((i, el) => $(el).val().trim()).get().join(" ");
    let list = $(this).closest(".container").find("ul");

    if (inputText !== "") {
      let listItem = $("<li class='list-group-item d-flex justify-content-between align-items-center'></li>");
      listItem.append("<span class='item-text'>" + inputText + "</span>");
      listItem.append(`
        <div>
          <button class="btn btn-sm btn-success complete-btn">✔</button>
          <button class="btn btn-sm btn-warning edit-btn">✎</button>
          <button class="btn btn-sm btn-danger delete-btn">✖</button>
        </div>
      `);
      list.append(listItem);
      inputs.val("");
    }
    updateProgress();
  });

  // Delete
  $(document).on("click", ".delete-btn", function () {
    $(this).closest("li").remove();
    updateProgress();
  });

  // Complete / Toggle
  $(document).on("click", ".complete-btn", function () {
    let item = $(this).closest("li");
    item.toggleClass("list-group-item-success");
    item.find(".item-text").toggleClass("completed");
    updateProgress();
  });

  // Edit
  $(document).on("click", ".edit-btn", function () {
    let item = $(this).closest("li");
    let textSpan = item.find(".item-text");
    let newText = prompt("Edit item:", textSpan.text());
    if (newText !== null && newText.trim() !== "") {
      textSpan.text(newText);
    }
  });

  // Filter
  $(".filter-btn").click(function () {
    let filter = $(this).data("filter");
    let list = $(this).closest(".container").find("ul li");
    list.each(function () {
      let isCompleted = $(this).hasClass("list-group-item-success");
      if (filter === "all") $(this).show();
      else if (filter === "active" && isCompleted) $(this).hide();
      else if (filter === "completed" && !isCompleted) $(this).hide();
      else $(this).show();
    });
  });

  // Progress Bar (Achievements page only)
  function updateProgress() {
    if ($("#achievementList").length) {
      let total = $("#achievementList li").length;
      let completed = $("#achievementList li.list-group-item-success").length;
      let percent = total > 0 ? Math.round((completed / total) * 100) : 0;
      $("#progressBar").css("width", percent + "%").text(percent + "%");
    }
  }
});
