$(document).ready(function() {
  // hide postamble and move author and date below title
  $('#postamble').hide();
  let author = $('.author').text().replace("Author: ", " ");
  let created = $('.date').text().slice(9, 19);
  $(".title").append("<br/><span style='font-size: 0.7em;'>" + author + "</span><br/><span style='font-size: 0.5em;'>" + created + "</span>")

  $("h2").css("border-bottom", "5px solid #ddd");
  $("h3").prepend("far:hand-point-right ")

  // add fontawesome icons as list icons
  $("ul").addClass("fa-ul");
  $("ul").css("--fa-li-margin", "1.5em");
  $("li").each(function() {
    let elem = $(this);
    elem.prepend("<span class='fa-li'><i class='far fa-star'></i></span>");
  });

  // move heading dates into title
  // heading dates are identified by being the next paragraph after
  // a heading in the format yyyy-mm-dd
  var is_date = new RegExp(/\d{4}-\d{2}-\d{2}/);
  $(":header").each(function() {
    let h2_elem = $(this);
    let next_elem = h2_elem.next();
    if (next_elem.is("div") && next_elem.has("p").length == 1) {
      let p_elem = $(next_elem.children("p")[0]);
      let text_is_date = is_date.test(p_elem.text().trim())
      if (text_is_date) {
        p_elem.hide();
        h2_elem.append("<span style='color: #444; float: right'><small>" + p_elem.text() + "</small></span>");
      }
    }
  });

  // process fontawesome icons
  $("body").html($("body").html().replace(/far:([^\s]*)/g, '<i class="far fa-fw fa-$1"></i>'));
  $("body").html($("body").html().replace(/fas:([^\s]*)/g, '<i class="fa-solid fa-fw fa-$1"></i>'));
  $("body").html($("body").html().replace(/fab:([^\s]*)/g, '<i class="fa-brands fa-fw fa-$1"></i>'));

  // add external-link icon to links that begin with 'http'
  $("a").each(function() {
    let elem = $(this);
    if(elem.attr("href").slice(0,4) == "http") {
      elem.append("<i class='fa fa-fw fa-external-link'>");
    }
  });

  // make headings links to their ids
  $(":header").each(function() {
    let elem = $(this);
    elem.html("<a href='#" + elem.attr("id") + "'>" + elem.html() + "</a>");
  });

  // make images links
  $("img").each(function() {
    let elem = $(this);
    elem.parent().html("<a href='" + elem.attr("src") + "'>" + elem.parent().html() + "</a>");
  });

  // add target=_blank to all http links and links that contain image tags
  $("a").each(function() {
    let elem = $(this);
    if(elem.attr("href").slice(0,4) == "http" || elem.has("img").length) {
      elem.attr("target", "_blank");
    }
  });
});
