import { $, $all, DUR } from './utils.js';

var TRAVEL = 4000; // --dg-step-wait + --dg-step-travel.

// Replays a stepper from step 1 up to its marked state once it enters the
// viewport. Until then it waits on step 1; without JS the marked state shows.
export function wireSteps(ctx) {
  $all("[data-dg-steps-play]", ctx).forEach(function (group) {
    if (group.__dg) return; group.__dg = true;
    if (!window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var steps = $all(".dg-step", group);
    var dots = steps.map(function (step) { return $(".dg-step-dot", step); });
    var marks = dots.map(function (dot) { return dot.innerHTML; });
    var end = steps.findIndex(function (step) { return step.classList.contains("is-active"); });
    if (end < 0) end = steps.length;
    if (!end) return;

    // While the line travels no step is active: the next one lights up on arrival.
    function show(current, arrived) {
      steps.forEach(function (step, i) {
        step.classList.toggle("is-done", i < current);
        step.classList.toggle("is-active", arrived && i === current);
        var mark = i < end && i >= current ? String(i + 1) : marks[i];
        // Rewriting an unchanged dot would restart its check animation.
        if (dots[i].innerHTML !== mark) dots[i].innerHTML = mark;
      });
    }

    // Reset without transitions, or the marked state visibly unwinds to step 1.
    group.classList.add("dg-steps-reset");
    show(0, true);
    void group.offsetWidth;
    group.classList.remove("dg-steps-reset");

    var obs = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      var current = 0;
      var timer = setInterval(function () {
        var from = steps[current];
        var next = ++current;
        show(next, false);
        from.classList.add("is-advancing");
        setTimeout(function () {
          from.classList.remove("is-advancing");
          show(next, true);
        }, TRAVEL);
        if (next >= end) clearInterval(timer);
      }, DUR * 4.8);
    }, { threshold: 0.6 });
    obs.observe(group);
  });
}
