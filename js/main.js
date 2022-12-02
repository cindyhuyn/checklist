$(function () {
  $(".js-check-all").on("click", function () {
    if ($(this).prop("checked")) {
      $('th input[type="checkbox"]').each(function () {
        $(this).prop("checked", true);
      });
    } else {
      $('th input[type="checkbox"]').each(function () {
        $(this).prop("checked", false);
      });
    }
  });

  function ShowHideDiv(chkPassport) {
    var dvPassport = document.getElementById("dvPassport");
    dvPassport.style.display = chkPassport.checked ? "block" : "none";
  }
  function FilterRows() {
    $(document).ready(function ($) {
      $("table").hide();
      $("#solutionSelect").change(function () {
        $("table").show();
        var selection = $(this).val();
        var dataset = $("#table5 tbody").find("tr");
        // show all rows first
        dataset.show();
        // filter the rows that should be hidden
        dataset
          .filter(function (index, item) {
            return (
              $(item)
                .find("td:first-child")
                .text()
                .split(",")
                .indexOf(selection) === -1
            );
          })
          .hide();
      });
    });
  }

  function myFunction() {
    $("table").hide();
    $("#solutionSelect").change(function () {
      $("table").show();
      var selection = $(this).val();
      var dataset = $("#table5").find("tr");

      dataset.each(function (index) {
        item = $(this);
        item.hide();

        var firstTd = item.find("td:first-child");
        var text = firstTd.text();
        var ids = text.split(",");

        for (var i = 0; i < ids.length; i++) {
          if (ids[i] == selection) {
            item.show();
          }
        }
      });
    });
  }

  const $tableTr = $("table tbody tr");
  let $counter1;
  let $counter2;

  // top filters: solution
  $("#solution").on("change", function (e) {
    const value = e.target.value;
    console.log("counter1 is", value);
    $counter1 = value;
    console.log("counter2 is", $counter2);
    $tableTr.each(function () {
      const solnValues = $(this).data("soln");
      const useCaseValues = $(this).attr("data-use-case");
      if (value && $counter2) {
        if (
          solnValues &&
          solnValues.split(", ").includes(value) &&
          useCaseValues &&
          useCaseValues.split(", ").includes($counter2)
        ) {
          $(this).show();
        } else {
          $(this).hide();
        }
      } else if (value) {
        if (solnValues && solnValues.split(", ").includes(value)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      } else {
        if (useCaseValues && useCaseValues.split(", ").includes($counter2)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      }
    });
  });

  // top filters: use case
  $("#useCaseSelect").on("change", function (e) {
    // console.log(e.target.value);
    const value = e.target.value;
    console.log("counter1 is", $counter1);
    console.log("counter2 is", value);
    $counter2 = value;
    $tableTr.each(function () {
      const useCaseValues = $(this).attr("data-use-case");
      const solnValues = $(this).data("soln");
      if ($counter1 && value) {
        if (
          solnValues &&
          solnValues.split(", ").includes($counter1) &&
          useCaseValues &&
          useCaseValues.split(", ").includes(value)
        ) {
          $(this).show();
        } else {
          $(this).hide();
        }
      } else if ($counter1) {
        if (solnValues && solnValues.split(", ").includes($counter1)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      } else {
        if (useCaseValues && useCaseValues.split(", ").includes(value)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      }
    });
    //   if (useCaseValues) {
    //     if (useCaseValues.split(", ").includes(value)) {
    //       $(this).show();
    //     } else {
    //       $(this).hide();
    //     }
    //   } else {
    //     $(this).hide();
    //   }
    // });
    //     });
  });

  // table filter tabs
  $('table tbody tr input[type="checkbox"]').on("change", function () {
    $(this).parents("tr").toggleClass("completed");
  });
  $("#show-uncompleted").on("click", function () {
    $("table tr.completed").hide();
    $("table tr").not(".completed").show();
  });
  $("#show-completed").on("click", function () {
    $("table tr.completed").show();
    $("table tbody tr").not(".completed").hide();
  });
  $("#show-all").on("click", function () {
    $("table tr").show();
  });
});
