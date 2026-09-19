// Curated DSA pattern data. Counts are derived at runtime in app.js.
window.PATTERNS = [
{
  id:'p1', num:'01', name:'Two Pointers', sub:'opposite ends, one pass',
  count:13, time:'O(n) · O(n²) for triplets', space:'O(1)', signal:'sorted · pair/triplet · in-place',
  desc:'For sorted or partitionable arrays. Move inward from both ends (or slow/fast from one end) and decide which pointer advances based on what you see. O(n) or O(n log n) after sort, O(1) extra space.',
  when:'Array is sorted (or sortable), you hunt pairs/triplets, need in-place segregation, or a product/sum constraint on subarrays.',
  template:{label:'Template — opposite pointers',code:`<span class="k">let</span> <span class="f">l = 0, r = n-1</span>;
<span class="k">while</span> (l < r) {
  <span class="k">const</span> s = a[l] + a[r];
  <span class="k">if</span> (s === target) <span class="k">return</span> [l, r];
  <span class="k">if</span> (s < target) l++; <span class="k">else</span> r--;
}`},
  problems:[
    {name:'Pair with Target Sum — Two Sum II (sorted)',meta:'LC 167 · sorted array',diff:'easy',role:'Canonical opposite-pointers entry point',links:[{l:'LC 167',u:'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/'}]},
    {name:'Segregate 0s and 1s',meta:'GFG · partition',diff:'easy',role:'Partition pointers — Dutch-flag warm-up',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/segregate-0s-and-1s5106/1'}]},
    {name:'Remove Duplicates — Sorted Array',meta:'LC 26 · also LC 83 (LL)',diff:'easy',role:'Slow/fast write pointer — in-place compaction',links:[{l:'LC 26',u:'https://leetcode.com/problems/remove-duplicates-from-sorted-array/'},{l:'LC 83',u:'https://leetcode.com/problems/remove-duplicates-from-sorted-list/'}]},
    {name:'Remove Duplicates II — at most twice',meta:'LC 80 · follow-up',diff:'med',role:'Generalise write condition — count window',links:[{l:'LC 80',u:'https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/'}]},
    {name:'Squares of a Sorted Array',meta:'LC 977',diff:'easy',role:'Largest absolute at ends — fill from back',links:[{l:'LC 977',u:'https://leetcode.com/problems/squares-of-a-sorted-array/'}]},
    {name:'Triplet Sum to Zero — 3Sum',meta:'LC 15 · sorting + dedup',diff:'med',role:'Fix one, two-pointer the rest — dedup is the lesson',links:[{l:'LC 15',u:'https://leetcode.com/problems/3sum/'}]},
    {name:'Triplet Sum Close to Target — 3Sum Closest',meta:'LC 16',diff:'med',role:'Track best distance, not equality',links:[{l:'LC 16',u:'https://leetcode.com/problems/3sum-closest/'}]},
    {name:'Triplets with Smaller Sum',meta:'GFG · count variants',diff:'med',role:'Counting, not listing — r-l triplets at once',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/count-triplets-with-sum-smaller-than-x5549/1'}]},
    {name:'Subarrays with Product < K',meta:'LC 713',diff:'med',role:'Window-counting cousin — same pointer discipline',links:[{l:'LC 713',u:'https://leetcode.com/problems/subarray-product-less-than-k/'}]},
    {name:'Dutch National Flag — Sort Colors',meta:'LC 75 · 0/1/2 partition',diff:'med',role:'Three-way partition — low/mid/high',links:[{l:'LC 75',u:'https://leetcode.com/problems/sort-colors/'}]},
    {name:'Quadruple Sum to Target — 4Sum',meta:'LC 18 · Challenge 1',diff:'med',role:'Double loop + two pointers',links:[{l:'LC 18',u:'https://leetcode.com/problems/4sum/'}]},
    {name:'Comparing Strings with Backspaces',meta:'LC 844 · Challenge 2',diff:'med',role:'Two pointers from the end — skip counters',links:[{l:'LC 844',u:'https://leetcode.com/problems/backspace-string-compare/'}]},
    {name:'Minimum Window Sort',meta:'LC 581 · Challenge 3',diff:'med',role:'Find disorder window, extend with min/max',links:[{l:'LC 581',u:'https://leetcode.com/problems/shortest-unsorted-continuous-subarray/'}]},
  ]
},
{
  id:'p2', num:'02', name:'Fast & Slow Pointers', sub:'tortoise and hare',
  count:8, time:'O(n)', space:'O(1)', signal:'cycle · middle · palindrome',
  desc:'Two pointers at different speeds on a linked list or implicit cycle. Detects cycles, finds middles, and reorders without extra space.',
  when:'Linked list, array-as-graph, or iterative function chain — cycles, midpoints, or symmetry.',
  template:{label:'Template — Floyd',code:`<span class="k">let</span> slow = head, fast = head;
<span class="k">while</span> (fast && fast.<span class="f">next</span>) {
  slow = slow.<span class="f">next</span>; fast = fast.<span class="f">next</span>.<span class="f">next</span>;
  <span class="k">if</span> (slow === fast) <span class="k">break</span>; <span class="c">// cycle</span>
}`},
  problems:[
    {name:'LinkedList Cycle',meta:'LC 141',diff:'easy',role:'Does a cycle exist?',links:[{l:'LC 141',u:'https://leetcode.com/problems/linked-list-cycle/'}]},
    {name:'Start of LinkedList Cycle',meta:'LC 142',diff:'med',role:'Where the cycle begins',links:[{l:'LC 142',u:'https://leetcode.com/problems/linked-list-cycle-ii/'}]},
    {name:'Happy Number',meta:'LC 202',diff:'med',role:'Implicit cycle — numbers as linked list',links:[{l:'LC 202',u:'https://leetcode.com/problems/happy-number/'}]},
    {name:'Find Duplicate Number',meta:'LC 287',diff:'med',role:'Array as graph — cycle start = duplicate',links:[{l:'LC 287',u:'https://leetcode.com/problems/find-the-duplicate-number/'}]},
    {name:'Middle of the LinkedList',meta:'LC 876',diff:'easy',role:'Fast hits end, slow is middle',links:[{l:'LC 876',u:'https://leetcode.com/problems/middle-of-the-linked-list/'}]},
    {name:'Palindrome LinkedList',meta:'LC 234 · Challenge 1',diff:'med',role:'Find middle → reverse second half → compare',links:[{l:'LC 234',u:'https://leetcode.com/problems/palindrome-linked-list/'}]},
    {name:'Rearrange a LinkedList — Reorder List',meta:'LC 143 · Challenge 2',diff:'med',role:'Split, reverse, merge',links:[{l:'LC 143',u:'https://leetcode.com/problems/reorder-list/'}]},
    {name:'Cycle in a Circular Array',meta:'LC 457 · Hard · Challenge 3',diff:'hard',role:'Direction must stay consistent',links:[{l:'LC 457',u:'https://leetcode.com/problems/circular-array-loop/'}]},
  ]
},
{
  id:'p3', num:'03', name:'Sliding Window', sub:'expand, shrink, record',
  count:12, time:'O(n)', space:'O(k)', signal:'"subarray / substring"',
  desc:'For contiguous subarrays / substrings with a constraint: expand the right edge, shrink from the left until valid again, track the optimum. Fixed-size and variable-size windows share the same discipline.',
  when:'Longest / smallest / count of contiguous segments with a condition on distinct chars, sums, or replacements.',
  template:{label:'Template — variable window',code:`<span class="k">let</span> l = 0, best = 0;
<span class="k">for</span> (<span class="k">let</span> r = 0; r < n; r++) { add(a[r]);
  <span class="k">while</span> (!valid()) remove(a[l++]);
  best = Math.<span class="f">max</span>(best, r - l + 1);
}`},
  problems:[
    {name:'Maximum Sum Subarray of Size K',meta:'GFG · Easy',diff:'easy',role:'Fixed window — add one, drop one',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1'}]},
    {name:'Smallest Subarray with Given Sum',meta:'LC 209 · Easy',diff:'easy',role:'Variable window — shrink while sum ≥ target',links:[{l:'LC 209',u:'https://leetcode.com/problems/minimum-size-subarray-sum/'}]},
    {name:'Longest Substring with K Distinct Characters',meta:'GFG · Medium',diff:'med',role:'Map size = distinct — shrink when > K',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1'}]},
    {name:'Fruits into Baskets',meta:'LC 904 · Medium',diff:'med',role:'Same as K-distinct with K=2',links:[{l:'LC 904',u:'https://leetcode.com/problems/fruit-into-baskets/'}]},
    {name:'No-Repeat Substring',meta:'LC 3 · Hard',diff:'med',role:'Window with last-index map — jump L',links:[{l:'LC 3',u:'https://leetcode.com/problems/longest-substring-without-repeating-characters/'}]},
    {name:'Longest Substring with Same Letters after Replacement',meta:'LC 424 · Hard',diff:'med',role:'Keep maxFreq — valid if len - maxFreq ≤ k',links:[{l:'LC 424',u:'https://leetcode.com/problems/longest-repeating-character-replacement/'}]},
    {name:'Longest Subarray with Ones after Replacement',meta:'LC 1004 · Hard',diff:'med',role:'Binary window — flip at most k zeros',links:[{l:'LC 1004',u:'https://leetcode.com/problems/max-consecutive-ones-iii/'}]},
    {name:'Minimum Window Substring',meta:'LC 76 · Hard',diff:'hard',role:'Need-all-chars window — have/need counters',links:[{l:'LC 76',u:'https://leetcode.com/problems/minimum-window-substring/'}]},
    {name:'Permutation in a String — Challenge 1',meta:'LC 567 · Hard',diff:'med',role:'Fixed-window anagram check',links:[{l:'LC 567',u:'https://leetcode.com/problems/permutation-in-string/'}]},
    {name:'String Anagrams — Challenge 2',meta:'LC 438 · Hard',diff:'med',role:'List all anagram windows',links:[{l:'LC 438',u:'https://leetcode.com/problems/find-all-anagrams-in-a-string/'}]},
    {name:'Words Concatenation — Challenge 4',meta:'LC 30 · Hard',diff:'hard',role:'Word-level window — step by word length',links:[{l:'LC 30',u:'https://leetcode.com/problems/substring-with-concatenation-of-all-words/'}]},
    {name:'Minimum Size Subarray Sum (drill repeat)',meta:'LC 209 · second listing',diff:'med',role:'Re-drill — the canonical shrink-while-valid',links:[{l:'LC 209',u:'https://leetcode.com/problems/minimum-size-subarray-sum/'}]},
  ]
},
{
  id:'p4', num:'04', name:"Kadane's Pattern", sub:'best subarray in one pass',
  count:6, time:'O(n)', space:'O(1)', signal:'"contiguous" · max/min · product',
  desc:'Maximum / minimum contiguous sum via DP: at each index decide to extend the previous subarray or start fresh. Extensions handle products, deletions, circular wraps, and absolute values.',
  when:'"Contiguous subarray" with max / min / product / circular / one deletion / absolute value.',
  template:{label:"Template — Kadane",code:`<span class="k">let</span> cur = nums[0], best = nums[0];
<span class="k">for</span> (<span class="k">let</span> i=1;i<n;i++){
  cur = Math.<span class="f">max</span>(nums[i], cur + nums[i]);
  best = Math.<span class="f">max</span>(best, cur);
}`},
  problems:[
    {name:'Maximum Subarray Sum',meta:'LC 53',diff:'med',role:'Core — extend or restart',links:[{l:'LC 53',u:'https://leetcode.com/problems/maximum-subarray/'}]},
    {name:'Minimum Subarray Sum',meta:'GFG',diff:'easy',role:'Flip max to min — same pass',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/smallest-sum-contiguous-subarray/1'}]},
    {name:'Maximum Product Subarray',meta:'LC 152',diff:'med',role:'Track curMax and curMin — sign flip',links:[{l:'LC 152',u:'https://leetcode.com/problems/maximum-product-subarray/'}]},
    {name:'Maximum Subarray Sum with One Deletion',meta:'LC 1186',diff:'med',role:'Two states — with / without deletion',links:[{l:'LC 1186',u:'https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/'}]},
    {name:'Maximum Absolute Sum of Any Subarray',meta:'LC 1749',diff:'med',role:'max(|maxSub|, |minSub|)',links:[{l:'LC 1749',u:'https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/'}]},
    {name:'Maximum Sum — Circular Array',meta:'LC 918',diff:'med',role:'max(linearKadane, total - minKadane)',links:[{l:'LC 918',u:'https://leetcode.com/problems/maximum-sum-circular-subarray/'}]},
  ]
},
{
  id:'p5', num:'05', name:'Prefix Sum', sub:'turn ranges into lookups',
  count:6, time:'O(n)', space:'O(n)', signal:'"equals K" · divisible · balanced',
  desc:'Store cumulative sums (or counts) in a hash map. A subarray [l..r] becomes a difference of two prefixes — counting, divisibility, or balance becomes O(1) per step.',
  when:'Counting subarrays by sum, remainder, or balance — and O(n²) is too slow.',
  template:{label:'Template — subarray sum = K',code:`<span class="k">let</span> pref=0, ans=0, map={0:1};
<span class="k">for</span> (<span class="k">let</span> x <span class="k">of</span> nums){
  pref += x;
  ans += map[pref - k] || 0;
  map[pref] = (map[pref]||0)+1;
}`},
  problems:[
    {name:'Subarray Sum Equals K',meta:'LC 560',diff:'med',role:'Core prefix-map counting',links:[{l:'LC 560',u:'https://leetcode.com/problems/subarray-sum-equals-k/'}]},
    {name:'Find Pivot Index',meta:'LC 724',diff:'easy',role:'Left sum vs right sum via total',links:[{l:'LC 724',u:'https://leetcode.com/problems/find-pivot-index/'}]},
    {name:'Subarray Sums Divisible By K',meta:'LC 974',diff:'med',role:'Remainder map — handle negative mod',links:[{l:'LC 974',u:'https://leetcode.com/problems/subarray-sums-divisible-by-k/'}]},
    {name:'Contiguous Array — equal 0s and 1s',meta:'LC 525',diff:'med',role:'Map 0→-1, then longest zero-sum',links:[{l:'LC 525',u:'https://leetcode.com/problems/contiguous-array/'}]},
    {name:'Shortest Subarray With Sum at Least K',meta:'LC 862 · Hard',diff:'hard',role:'Monotonic deque over prefix — negatives allowed',links:[{l:'LC 862',u:'https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/'}]},
    {name:'Count of Range Sum',meta:'LC 327 · Hard',diff:'hard',role:'Merge-sort counting on prefix array',links:[{l:'LC 327',u:'https://leetcode.com/problems/count-of-range-sum/'}]},
  ]
},
{
  id:'p6', num:'06', name:'Merge Intervals', sub:'sort, then sweep',
  count:7, time:'O(n log n)', space:'O(n)', signal:'intervals · meetings · overlap',
  desc:'Sort by start, then walk once merging overlaps. Variants handle insertion, intersections, room counts, and free-time gaps.',
  when:'Anything with [start, end] — scheduling, calendars, coverage.',
  template:{label:'Template — merge',code:`intervals.<span class="f">sort</span>((a,b)=>a[0]-b[0]);
<span class="k">const</span> out=[intervals[0]];
<span class="k">for</span>(<span class="k">const</span> [s,e] <span class="k">of</span> intervals.<span class="f">slice</span>(1)){
  <span class="k">const</span> last=out[out.length-1];
  <span class="k">if</span>(s <= last[1]) last[1]=Math.<span class="f">max</span>(last[1],e);
  <span class="k">else</span> out.<span class="f">push</span>([s,e]);
}`},
  problems:[
    {name:'Merge Intervals',meta:'LC 56',diff:'med',role:'Core sort-and-merge',links:[{l:'LC 56',u:'https://leetcode.com/problems/merge-intervals/'}]},
    {name:'Insert Interval',meta:'LC 57',diff:'med',role:'Insert then merge — three zones',links:[{l:'LC 57',u:'https://leetcode.com/problems/insert-interval/'}]},
    {name:'Intervals Intersection',meta:'LC 986',diff:'med',role:'Two pointers across two sorted lists',links:[{l:'LC 986',u:'https://leetcode.com/problems/interval-list-intersections/'}]},
    {name:'Overlapping Intervals — check any overlap',meta:'GFG',diff:'easy',role:'Early-exit variant',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/check-if-any-two-intervals-overlap-among-a-given-set-of-intervals/'}]},
    {name:'Minimum Meeting Rooms — Challenge 1',meta:'GFG · Hard',diff:'med',role:'Min heap of end times or sweep line',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/attend-all-meetings-ii/1'}]},
    {name:'Maximum CPU Load — Challenge 2',meta:'GFG · Hard',diff:'hard',role:'Weighted overlap — max concurrent load',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/maximum-cpu-load-from-the-given-list-of-jobs/'}]},
    {name:'Employee Free Time — Challenge 3',meta:'LC 759 · Hard',diff:'hard',role:'K-way merge of interval lists, then gaps',links:[{l:'LC 759',u:'https://www.codertrain.co/employee-free-time'}]},
  ]
},
{
  id:'p7', num:'07', name:'In-Place Reversal', sub:'flip the arrows',
  count:6, time:'O(n)', space:'O(1)', signal:'reverse · rotate · k-group',
  desc:'Reverse pointers iteratively without extra space. Single pass for whole list, bounded pass for sublists, and chunked pass for k-groups.',
  when:"Linked list order must change but you can't allocate a new list.",
  template:{label:'Template — full reversal',code:`<span class="k">let</span> prev=<span class="k">null</span>, cur=head;
<span class="k">while</span>(cur){ <span class="k">const</span> nxt=cur.<span class="f">next</span>; cur.<span class="f">next</span>=prev; prev=cur; cur=nxt; }
<span class="k">return</span> prev;`},
  problems:[
    {name:'Reverse a LinkedList',meta:'LC 206',diff:'easy',role:'Core — iterative and recursive',links:[{l:'LC 206',u:'https://leetcode.com/problems/reverse-linked-list/'}]},
    {name:'Reverse a Sub-list (between left & right)',meta:'LC 92',diff:'med',role:'Bounded reversal with dummy',links:[{l:'LC 92',u:'https://leetcode.com/problems/reverse-linked-list-ii/'}]},
    {name:'Reverse List in Pairs — Swap Nodes in Pairs',meta:'LC 24',diff:'med',role:'Pairwise swap — dummy makes head easy',links:[{l:'LC 24',u:'https://leetcode.com/problems/swap-nodes-in-pairs/'}]},
    {name:'Reverse every K-element Sub-list',meta:'LC 25 · Hard',diff:'hard',role:'Chunked reversal — only full groups flip',links:[{l:'LC 25',u:'https://leetcode.com/problems/reverse-nodes-in-k-group/'}]},
    {name:'Reverse Nodes in Even Length Groups — Ch 1',meta:'LC 2074 · Hard',diff:'hard',role:'Growing groups — reverse if group size even',links:[{l:'LC 2074',u:'https://leetcode.com/problems/reverse-nodes-in-even-length-groups/'}]},
    {name:'Rotate a LinkedList — Challenge 2',meta:'LC 61',diff:'med',role:'Make circular, then cut at n - k % n',links:[{l:'LC 61',u:'https://leetcode.com/problems/rotate-list/'}]},
  ]
},
{
  id:'p8', num:'08', name:'Stack & Monotonic Stack', sub:'last in, next greater',
  count:9, time:'O(n)', space:'O(n)', signal:'parentheses · next greater · path',
  desc:'A stack remembers unfinished work. Parentheses use it literally; "next greater" keeps a decreasing stack; path and digit problems use greedy stack pops.',
  when:'Nesting, undo, next/previous greater, or "remove to optimise" appears.',
  template:{label:'Template — next greater',code:`<span class="k">const</span> st=[], ans=<span class="f">Array</span>(n).<span class="f">fill</span>(-1);
<span class="k">for</span>(<span class="k">let</span> i=0;i<n;i++){
  <span class="k">while</span>(st.length && nums[st[st.length-1]] < nums[i])
    ans[st.<span class="f">pop</span>()]=nums[i];
  st.<span class="f">push</span>(i);
}`},
  problems:[
    {name:'Remove Adjacent Duplicates',meta:'LC 1047',diff:'easy',role:'Cancel neighbours — stack as eraser',links:[{l:'LC 1047',u:'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/'}]},
    {name:'Balanced Parentheses',meta:'LC 20',diff:'easy',role:'Push opens, match on close',links:[{l:'LC 20',u:'https://leetcode.com/problems/valid-parentheses/'}]},
    {name:'Next Greater Element II',meta:'LC 503',diff:'med',role:'Circular — iterate 2n, use mod index',links:[{l:'LC 503',u:'https://leetcode.com/problems/next-greater-element-ii/'}]},
    {name:'Daily Temperatures',meta:'LC 739',diff:'med',role:'Next warmer day — distance, not value',links:[{l:'LC 739',u:'https://leetcode.com/problems/daily-temperatures/'}]},
    {name:'Remove Nodes From Linked List',meta:'LC 2487',diff:'med',role:'Monotonic stack of values, rebuild list',links:[{l:'LC 2487',u:'https://leetcode.com/problems/remove-nodes-from-linked-list/'}]},
    {name:'Remove All Adjacent Duplicates in String II',meta:'LC 1209',diff:'med',role:'Stack of [char, count] — pop at k',links:[{l:'LC 1209',u:'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/'}]},
    {name:'Reverse a String',meta:'Conceptual — stack as reversal',diff:'easy',role:'Concept check — push all, pop to reverse',links:[]},
    {name:'Simplify Path — Challenge',meta:'LC 71',diff:'med',role:'Split by "/", stack of dir names — handle . and ..',links:[{l:'LC 71',u:'https://leetcode.com/problems/simplify-path/'}]},
    {name:'Remove K Digits — Challenge (Hard)',meta:'LC 402',diff:'med',role:'Greedy monotonic stack — smallest number after k removals',links:[{l:'LC 402',u:'https://leetcode.com/problems/remove-k-digits/'}]},
  ]
},
{
  id:'p9', num:'09', name:'Hash Maps', sub:'count, then decide',
  count:4, time:'O(n)', space:'O(n)', signal:'frequency · first unique · can-build',
  desc:'Frequency tables answer existence, uniqueness, and construction questions in O(n). The work is choosing what to count.',
  when:'Character or element frequencies determine the answer.',
  template:null,
  problems:[
    {name:'First Non-Repeating Character',meta:'LC 387',diff:'easy',role:'Count then scan — first with freq 1',links:[{l:'LC 387',u:'https://leetcode.com/problems/first-unique-character-in-a-string/'}]},
    {name:'Maximum Number of Balloons',meta:'LC 1189',diff:'easy',role:'Min over required counts — "l" and "o" need 2×',links:[{l:'LC 1189',u:'https://leetcode.com/problems/maximum-number-of-balloons/'}]},
    {name:'Longest Palindrome',meta:'LC 409',diff:'easy',role:'Add even counts fully, odd counts minus one, plus one centre',links:[{l:'LC 409',u:'https://leetcode.com/problems/longest-palindrome/'}]},
    {name:'Ransom Note',meta:'LC 383',diff:'easy',role:'Can magazine cover note? — decrement check',links:[{l:'LC 383',u:'https://leetcode.com/problems/ransom-note/'}]},
  ]
},
{
  id:'p10', num:'10', name:'Binary Search', sub:'cut the space in half',
  count:23, time:'O(log n) · O(n log max) for answer search', space:'O(1)', signal:'sorted · rotated · monotonic predicate',
  desc:'On sorted data or monotonic predicates. Classic search, then boundary searches (first/last, ceiling), then "binary search on answer" for optimisation problems.',
  when:'Sorted / rotated / infinite array, peaks, or "minimum feasible value" / "maximum feasible value" questions.',
  template:{label:'Template — lower bound',code:`<span class="k">let</span> lo=0, hi=n;
<span class="k">while</span>(lo < hi){
  <span class="k">const</span> mid=(lo+hi>>1);
  <span class="k">if</span>(a[mid] < target) lo=mid+1; <span class="k">else</span> hi=mid;
}
<span class="c">// lo is first ≥ target</span>`},
  problems:[
    {name:'Binary Search — Basic',meta:'LC 704',diff:'easy',role:'Core template',links:[{l:'LC 704',u:'https://leetcode.com/problems/binary-search/'}]},
    {name:'Upper Bound / Ceiling',meta:'GFG',diff:'easy',role:'First ≥ target — lower_bound',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/ceil-in-a-sorted-array/1'}]},
    {name:'First and Last Position of Element',meta:'LC 34',diff:'med',role:'Two binary searches — left + right bound',links:[{l:'LC 34',u:'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/'}]},
    {name:'Count Number of Occurrences',meta:'GFG',diff:'easy',role:'last - first + 1',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1'}]},
    {name:'Search in Infinite Sorted Array',meta:'GFG',diff:'med',role:'Exponential range expansion, then binary search',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/find-position-element-sorted-array-infinite-numbers/'}]},
    {name:'Peak Index in Mountain Array',meta:'LC 852',diff:'easy',role:'Binary search on slope',links:[{l:'LC 852',u:'https://leetcode.com/problems/peak-index-in-a-mountain-array/'}]},
    {name:'Find Peak Element',meta:'LC 162',diff:'med',role:'Any peak — same slope test, unsorted',links:[{l:'LC 162',u:'https://leetcode.com/problems/find-peak-element/'}]},
    {name:'Find Minimum in Rotated Sorted Array',meta:'LC 153',diff:'med',role:'Pivot is minimum — compare with hi',links:[{l:'LC 153',u:'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/'}]},
    {name:'Find Number of Rotations',meta:'GFG',diff:'easy',role:'Index of minimum = rotation count',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/rotation4723/1'}]},
    {name:'Search in Rotated Sorted Array',meta:'LC 33',diff:'med',role:'One half is always sorted',links:[{l:'LC 33',u:'https://leetcode.com/problems/search-in-rotated-sorted-array/'}]},
    {name:'Koko Eating Bananas',meta:'LC 875 · Answer search',diff:'med',role:'Min speed k — "can finish in h"',links:[{l:'LC 875',u:'https://leetcode.com/problems/koko-eating-bananas/'}]},
    {name:'Min Days to Make m Bouquets',meta:'LC 1482',diff:'med',role:'Can make m bouquets by day D?',links:[{l:'LC 1482',u:'https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/'}]},
    {name:'Aggressive Cows',meta:'GFG · Answer search',diff:'med',role:'Max min distance — can place with gap ≥ mid?',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/aggressive-cows/1'}]},
    {name:'H-Index II',meta:'LC 275',diff:'med',role:'Binary search on sorted citations',links:[{l:'LC 275',u:'https://leetcode.com/problems/h-index-ii/'}]},
    {name:'Maximum Candies Allocated to K Children',meta:'LC 2226',diff:'med',role:'Max candies per child — can allocate mid?',links:[{l:'LC 2226',u:'https://leetcode.com/problems/maximum-candies-allocated-to-k-children/'}]},
    {name:'Capacity to Ship Packages Within D Days',meta:'LC 1011',diff:'med',role:'Min capacity — greedy days check',links:[{l:'LC 1011',u:'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/'}]},
    {name:'Book Allocation Problem',meta:'GFG · Hard',diff:'hard',role:'Min of max pages — same predicate',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1'}]},
    {name:'Split Array Largest Sum',meta:'LC 410 · Hard',diff:'hard',role:'Min largest sub-array sum with k splits',links:[{l:'LC 410',u:'https://leetcode.com/problems/split-array-largest-sum/'}]},
    {name:'Search a 2D Matrix',meta:'LC 74',diff:'med',role:'Flatten to 1D index',links:[{l:'LC 74',u:'https://leetcode.com/problems/search-a-2d-matrix/'}]},
    {name:'Search a 2D Matrix II',meta:'LC 240 · Hard',diff:'med',role:'Row & col sorted — start top-right',links:[{l:'LC 240',u:'https://leetcode.com/problems/search-a-2d-matrix-ii/'}]},
    {name:'Kth Smallest in Sorted Matrix',meta:'LC 378',diff:'med',role:'Binary search on value range + count ≤ mid',links:[{l:'LC 378',u:'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/'}]},
    {name:'Kth Smallest in Multiplication Table',meta:'LC 668 · Hard',diff:'hard',role:'Same value-range search — Σ min(m, mid//i)',links:[{l:'LC 668',u:'https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/'}]},
    {name:'Median of Two Sorted Arrays',meta:'LC 4 · Hard',diff:'hard',role:'Partition binary search — kth element',links:[{l:'LC 4',u:'https://leetcode.com/problems/median-of-two-sorted-arrays/'}]},
  ]
},
{
  id:'p11', num:'11', name:'Heap', sub:'keep the best k, forget the rest',
  count:17, time:'O(n log k)', space:'O(k)', signal:'Kth · top K · merge · schedule',
  desc:'For "top K", merging, scheduling, and streaming medians. A heap holds only what you need — min-heap for K largest, max-heap for K smallest.',
  when:'Kth element, frequent / closest, merging sorted sources, or "schedule with constraint".',
  template:{label:'Template — top K frequent',code:`<span class="k">const</span> heap = <span class="k">new</span> <span class="f">MinHeap</span>((a,b)=>a[1]-b[1]);
<span class="k">for</span>(<span class="k">const</span> [val,cnt] <span class="k">of</span> freq){
  heap.<span class="f">push</span>([val,cnt]); <span class="k">if</span>(heap.size>k) heap.<span class="f">pop</span>();
}`},
  problems:[
    {name:'Kth Smallest Element',meta:'GFG',diff:'easy',role:'Max-heap of size k',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1'}]},
    {name:'Kth Largest Element',meta:'LC 215',diff:'med',role:'Min-heap of size k',links:[{l:'LC 215',u:'https://leetcode.com/problems/kth-largest-element-in-an-array/'}]},
    {name:'Top K Frequent Elements',meta:'LC 347',diff:'med',role:'Frequency map → heap',links:[{l:'LC 347',u:'https://leetcode.com/problems/top-k-frequent-elements/'}]},
    {name:'Top K Frequent Words',meta:'LC 692',diff:'med',role:'Same but tie-break lexicographically',links:[{l:'LC 692',u:'https://leetcode.com/problems/top-k-frequent-words/'}]},
    {name:'K Closest Points to Origin',meta:'LC 973',diff:'med',role:'Max-heap by distance²',links:[{l:'LC 973',u:'https://leetcode.com/problems/k-closest-points-to-origin/'}]},
    {name:'Find K Closest Elements',meta:'LC 658',diff:'med',role:'Heap by |x - target| or two pointers',links:[{l:'LC 658',u:'https://leetcode.com/problems/find-k-closest-elements/'}]},
    {name:'K Weakest Rows in a Matrix',meta:'LC 1337',diff:'easy',role:'Count soldiers per row → heap',links:[{l:'LC 1337',u:'https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/'}]},
    {name:'Merge K Sorted Arrays',meta:'GFG',diff:'med',role:'Min-heap of current heads — K-way merge',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/merge-k-sorted-arrays/1'}]},
    {name:'Kth Smallest in Sorted Matrix (heap view)',meta:'LC 378',diff:'med',role:'Heap over matrix rows',links:[{l:'LC 378',u:'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/'}]},
    {name:'Last Stone Weight',meta:'LC 1046',diff:'easy',role:'Max-heap simulation — smash two heaviest',links:[{l:'LC 1046',u:'https://leetcode.com/problems/last-stone-weight/'}]},
    {name:'CPU Task Scheduler',meta:'LC 621',diff:'med',role:'Max-heap of frequencies + cooldown queue',links:[{l:'LC 621',u:'https://leetcode.com/problems/task-scheduler/'}]},
    {name:'Reorganize String',meta:'LC 767',diff:'med',role:'Greedy with max-heap — place most frequent first',links:[{l:'LC 767',u:'https://leetcode.com/problems/reorganize-string/'}]},
    {name:'Min Number of Refueling Stops',meta:'LC 871 · Hard',diff:'hard',role:'Max-heap of passed stations',links:[{l:'LC 871',u:'https://leetcode.com/problems/minimum-number-of-refueling-stops/'}]},
    {name:'IPO',meta:'LC 502 · Hard',diff:'hard',role:'Two heaps — min by capital, max by profit',links:[{l:'LC 502',u:'https://leetcode.com/problems/ipo/'}]},
    {name:'Course Schedule III',meta:'LC 630 · Hard',diff:'hard',role:'Max-heap of durations — drop longest if over deadline',links:[{l:'LC 630',u:'https://leetcode.com/problems/course-schedule-iii/'}]},
    {name:'Find Median in Data Stream',meta:'LC 295 · Hard',diff:'hard',role:'Two-heap median maintenance',links:[{l:'LC 295',u:'https://leetcode.com/problems/find-median-from-data-stream/'}]},
    {name:'Sliding Window Median',meta:'LC 480 · Hard',diff:'hard',role:'Two heaps + lazy deletion',links:[{l:'LC 480',u:'https://leetcode.com/problems/sliding-window-median/'}]},
  ]
},
{
  id:'p12', num:'12', name:'Recursion & Backtracking', sub:'choose, explore, undo',
  count:10, time:'exponential — prune early', space:'O(depth)', signal:'"all …" · generate · partitions',
  desc:'Build candidates incrementally, recurse deeper, backtrack on failure. Powers permutations, combinations, and partitioning. Starts with pure recursion before branching.',
  when:'The problem asks for all possibilities — subsets, perms, combos, partitions.',
  template:{label:'Template — backtracking',code:`<span class="k">function</span> <span class="f">dfs</span>(start, path){
  <span class="k">if</span> (done(path)) { ans.<span class="f">push</span>([...path]); <span class="k">return</span>; }
  <span class="k">for</span>(<span class="k">let</span> i=start;i<n;i++){
    path.<span class="f">push</span>(a[i]); <span class="f">dfs</span>(i+1, path); path.<span class="f">pop</span>();
  }
}`},
  problems:[
    {name:'Fibonacci',meta:'LC 509',diff:'easy',role:'Base case + recurrence — memoise it',links:[{l:'LC 509',u:'https://leetcode.com/problems/fibonacci-number/'}]},
    {name:'Check if String is Palindrome',meta:'GFG',diff:'easy',role:'Two-pointer recursion — compare ends',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/palindrome-string0817/1'}]},
    {name:'Check if Array is Sorted',meta:'GFG',diff:'easy',role:'Recursion on index — all pairs in order?',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/check-if-an-array-is-sorted0701/1'}]},
    {name:'Sum of Digits of a Number',meta:'GFG',diff:'easy',role:'n % 10 + rec(n/10)',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/sum-of-digits1742/1'}]},
    {name:'Remove Occurrences of a Character',meta:'GFG',diff:'easy',role:'Filter recursion — build on unwind',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/remove-all-occurrences-of-a-character-in-a-string/1'}]},
    {name:'Generate Parentheses',meta:'LC 22',diff:'med',role:'Classic — open < n, close < open',links:[{l:'LC 22',u:'https://leetcode.com/problems/generate-parentheses/'}]},
    {name:'Letter Combinations of a Phone Number',meta:'LC 17',diff:'med',role:'Cartesian product — digit → letters',links:[{l:'LC 17',u:'https://leetcode.com/problems/letter-combinations-of-a-phone-number/'}]},
    {name:'Permutations',meta:'LC 46',diff:'med',role:'Swap or visited-set — n! leaves',links:[{l:'LC 46',u:'https://leetcode.com/problems/permutations/'}]},
    {name:'Combination Sum',meta:'LC 39',diff:'med',role:'Unlimited reuse — stay at i vs move to i+1',links:[{l:'LC 39',u:'https://leetcode.com/problems/combination-sum/'}]},
    {name:'Palindrome Partitioning',meta:'LC 131',diff:'med',role:'Cut wherever prefix is palindrome',links:[{l:'LC 131',u:'https://leetcode.com/problems/palindrome-partitioning/'}]},
  ]
},
{
  id:'p13', num:'13', name:'Trees & Graphs', sub:'traversals, then shortest paths',
  count:51, time:'O(V+E) · O(E log V) Dijkstra', space:'O(V)', signal:'tree · graph · grid · edges',
  desc:'Trees: DFS orders, BFS levels, BST properties, path sums, and construction. Graphs: adjacency, BFS/DFS, islands, cycles, topology, and weighted shortest paths.',
  when:'Hierarchy, connectivity, or "shortest / cheapest / fewest steps" on a network or grid.',
  template:null,
  problems:[
    {name:'Inorder Traversal',meta:'LC 94',diff:'easy',role:'Left → Node → Right — BST gives sorted order',links:[{l:'LC 94',u:'https://leetcode.com/problems/binary-tree-inorder-traversal/'}]},
    {name:'Preorder Traversal',meta:'LC 144',diff:'easy',role:'Node → Left → Right — root first',links:[{l:'LC 144',u:'https://leetcode.com/problems/binary-tree-preorder-traversal/'}]},
    {name:'Postorder Traversal — Homework',meta:'LC 145',diff:'easy',role:'Leaves first — height / diameter',links:[{l:'LC 145',u:'https://leetcode.com/problems/binary-tree-postorder-traversal/'}]},
    {name:'Level Order Traversal',meta:'LC 102',diff:'med',role:'BFS — queue, level by level',links:[{l:'LC 102',u:'https://leetcode.com/problems/binary-tree-level-order-traversal/'}]},
    {name:'ZigZag Level Order',meta:'LC 103',diff:'med',role:'Alternating direction per level',links:[{l:'LC 103',u:'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/'}]},
    {name:'Level Order II — Bottom Up — Homework',meta:'LC 107',diff:'med',role:'Reverse the level order result',links:[{l:'LC 107',u:'https://leetcode.com/problems/binary-tree-level-order-traversal-ii/'}]},
    {name:'Invert Binary Tree',meta:'LC 226',diff:'easy',role:'Swap left/right recursively',links:[{l:'LC 226',u:'https://leetcode.com/problems/invert-binary-tree/'}]},
    {name:'Symmetric Tree',meta:'LC 101',diff:'easy',role:'Mirror check — outer vs inner pairs',links:[{l:'LC 101',u:'https://leetcode.com/problems/symmetric-tree/'}]},
    {name:'Same Tree — Homework',meta:'LC 100',diff:'easy',role:'Structure + values equal',links:[{l:'LC 100',u:'https://leetcode.com/problems/same-tree/'}]},
    {name:'Subtree of Another Tree',meta:'LC 572',diff:'easy',role:'Same-tree check at every node',links:[{l:'LC 572',u:'https://leetcode.com/problems/subtree-of-another-tree/'}]},
    {name:'Flip Equivalent Binary Trees',meta:'LC 951',diff:'med',role:'At each node, try both orientations',links:[{l:'LC 951',u:'https://leetcode.com/problems/flip-equivalent-binary-trees/'}]},
    {name:'LCA of Binary Tree',meta:'LC 236',diff:'med',role:'Postorder — bubble up found nodes',links:[{l:'LC 236',u:'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/'}]},
    {name:'Search in a BST',meta:'LC 700',diff:'easy',role:'BST property — go left or right',links:[{l:'LC 700',u:'https://leetcode.com/problems/search-in-a-binary-search-tree/'}]},
    {name:'LCA of BST',meta:'LC 235',diff:'med',role:'Use BST ordering to walk down',links:[{l:'LC 235',u:'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/'}]},
    {name:'LCA of Deepest Leaves',meta:'LC 1123',diff:'med',role:'Height-aware postorder',links:[{l:'LC 1123',u:'https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/'}]},
    {name:'Two Sum IV — Input is a BST',meta:'LC 653',diff:'easy',role:'Inorder → sorted array → two pointers',links:[{l:'LC 653',u:'https://leetcode.com/problems/two-sum-iv-input-is-a-bst/'}]},
    {name:'Kth Smallest Element in BST',meta:'LC 230',diff:'med',role:'Inorder with counter — stop at k',links:[{l:'LC 230',u:'https://leetcode.com/problems/kth-smallest-element-in-a-bst/'}]},
    {name:'Minimum Depth of Binary Tree',meta:'LC 111',diff:'easy',role:'BFS for shortest root→leaf',links:[{l:'LC 111',u:'https://leetcode.com/problems/minimum-depth-of-binary-tree/'}]},
    {name:'Maximum Depth of Binary Tree',meta:'LC 104',diff:'easy',role:'1 + max(depth left, depth right)',links:[{l:'LC 104',u:'https://leetcode.com/problems/maximum-depth-of-binary-tree/'}]},
    {name:'Balanced Binary Tree',meta:'LC 110',diff:'easy',role:'Postorder returning height or -1',links:[{l:'LC 110',u:'https://leetcode.com/problems/balanced-binary-tree/'}]},
    {name:'Diameter of Binary Tree',meta:'LC 543',diff:'easy',role:'At each node, candidate = leftH + rightH',links:[{l:'LC 543',u:'https://leetcode.com/problems/diameter-of-binary-tree/'}]},
    {name:'Check Completeness of Binary Tree',meta:'LC 958',diff:'med',role:'BFS — after first null, no more non-null',links:[{l:'LC 958',u:'https://leetcode.com/problems/check-completeness-of-a-binary-tree/'}]},
    {name:'Validate BST',meta:'LC 98',diff:'med',role:'Range check — each node within (low, high)',links:[{l:'LC 98',u:'https://leetcode.com/problems/validate-binary-search-tree/'}]},
    {name:'Recover BST',meta:'LC 99',diff:'med',role:'Inorder finds two swapped nodes',links:[{l:'LC 99',u:'https://leetcode.com/problems/recover-binary-search-tree/'}]},
    {name:'Path Sum',meta:'LC 112',diff:'easy',role:'Root→leaf — subtract and check at leaf',links:[{l:'LC 112',u:'https://leetcode.com/problems/path-sum/'}]},
    {name:'Path Sum II',meta:'LC 113',diff:'med',role:'Collect all root→leaf paths that sum to target',links:[{l:'LC 113',u:'https://leetcode.com/problems/path-sum-ii/'}]},
    {name:'Sum of Root to Leaf Numbers',meta:'LC 129',diff:'med',role:'Carry number = parent*10 + node.val',links:[{l:'LC 129',u:'https://leetcode.com/problems/sum-root-to-leaf-numbers/'}]},
    {name:'Maximum Path Sum',meta:'LC 124 · Hard',diff:'hard',role:'Best through node = node + leftGain + rightGain',links:[{l:'LC 124',u:'https://leetcode.com/problems/binary-tree-maximum-path-sum/'}]},
    {name:'Construct Tree from Preorder & Inorder',meta:'LC 105',diff:'med',role:'Preorder root + inorder split → recurse',links:[{l:'LC 105',u:'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/'}]},
    {name:'Construct Tree from Inorder & Postorder',meta:'LC 106',diff:'med',role:'Postorder root is last',links:[{l:'LC 106',u:'https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/'}]},
    {name:'Sorted Array to BST',meta:'LC 108',diff:'easy',role:'Mid as root → balanced halves recursively',links:[{l:'LC 108',u:'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/'}]},
    // graphs
    {name:'Construct Adjacency List from Edges',meta:'GFG',diff:'easy',role:'Foundation — build representation',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/print-adjacency-list-1587115620/1'}],section:'Graphs — traversals, cycles & shortest paths'},
    {name:'Graph DFS',meta:'GFG',diff:'easy',role:'Recursive stack — visit, then neighbours',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1'}]},
    {name:'Graph BFS',meta:'GFG',diff:'easy',role:'Queue — level order on graphs',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1'}]},
    {name:'Number of Islands',meta:'LC 200',diff:'med',role:'Grid BFS/DFS — sink visited land',links:[{l:'LC 200',u:'https://leetcode.com/problems/number-of-islands/'}]},
    {name:'Number of Provinces',meta:'LC 547',diff:'med',role:'Connected components — DFS or Union-Find',links:[{l:'LC 547',u:'https://leetcode.com/problems/number-of-provinces/'}]},
    {name:'Rotten Oranges',meta:'LC 994',diff:'med',role:'Multi-source BFS — minutes as levels',links:[{l:'LC 994',u:'https://leetcode.com/problems/rotting-oranges/'}]},
    {name:'Cycle Detection — Undirected',meta:'GFG',diff:'med',role:'DFS with parent check',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1'}]},
    {name:'Cycle Detection — Directed',meta:'GFG',diff:'med',role:'DFS + recursion stack (white/gray/black)',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1'}]},
    {name:'Topological Sort',meta:'GFG',diff:'med',role:"Kahn's BFS (indegree queue) or DFS postorder",links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/topological-sort/1'}]},
    {name:'Bipartite Graph / Graph Coloring',meta:'LC 785',diff:'med',role:'2-colour BFS — neighbour must be opposite',links:[{l:'LC 785',u:'https://leetcode.com/problems/is-graph-bipartite/'}]},
    {name:"Surrounded Regions",meta:'LC 130',diff:'med',role:"Mark border-connected O's, flip the rest",links:[{l:'LC 130',u:'https://leetcode.com/problems/surrounded-regions/'}]},
    {name:'Shortest Path — Unweighted Graph',meta:'GFG',diff:'med',role:'BFS from source — first visit is shortest',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1'}]},
    {name:"Dijkstra's Algorithm",meta:'GFG',diff:'med',role:'Priority queue — expand closest unsettled node',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1'}]},
    {name:'Network Delay Time',meta:'LC 743',diff:'med',role:'Dijkstra from source — answer is max distance',links:[{l:'LC 743',u:'https://leetcode.com/problems/network-delay-time/'}]},
    {name:'Path With Minimum Effort',meta:'LC 1631',diff:'med',role:'Dijkstra where cost = max edge along path',links:[{l:'LC 1631',u:'https://leetcode.com/problems/path-with-minimum-effort/'}]},
    {name:'Swim in Rising Water',meta:'LC 778 · Hard',diff:'hard',role:'Minimise the maximum height on path',links:[{l:'LC 778',u:'https://leetcode.com/problems/swim-in-rising-water/'}]},
    {name:'Bellman-Ford',meta:'GFG',diff:'med',role:'Relax all edges V-1 times — handles negatives',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1'}]},
    {name:'Cheapest Flights Within K Stops',meta:'LC 787',diff:'med',role:'Constrained shortest path — modified Bellman-Ford / BFS',links:[{l:'LC 787',u:'https://leetcode.com/problems/cheapest-flights-within-k-stops/'}]},
    {name:"Prim's MST",meta:'GFG',diff:'med',role:'Grow MST with min-heap of cut edges',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1'}]},
    {name:'Word Ladder',meta:'LC 127 · Hard',diff:'hard',role:'BFS on implicit graph — one-letter neighbours',links:[{l:'LC 127',u:'https://leetcode.com/problems/word-ladder/'}]},
  ]
},
{
  id:'p14', num:'14', name:'Dynamic Programming & Greedy', sub:'optimal substructure vs. local choice',
  count:15, time:'DP O(n·W) / O(n²)', space:'O(n log n) Greedy', signal:'"maximum / minimum / ways"',
  desc:'DP: remember overlapping subproblems — Fibonacci through knapsack to stocks. Greedy: prove a local choice is globally optimal — intervals, jumps, coins.',
  when:'Optimisation over sequences or choices — "most / least / number of ways".',
  template:{label:'Template — 0/1 Knapsack (DP)',code:`<span class="k">const</span> dp=<span class="f">Array</span>(W+1).<span class="f">fill</span>(0);
<span class="k">for</span>(<span class="k">const</span> [wt,val] <span class="k">of</span> items)
  <span class="k">for</span>(<span class="k">let</span> w=W; w>=wt; w--)
    dp[w]=Math.<span class="f">max</span>(dp[w], dp[w-wt]+val);`},
  problems:[
    {name:'Fibonacci — DP Episode 02',meta:'LC 509',diff:'easy',role:'DP hello world — memo vs tabulation',links:[{l:'LC 509',u:'https://leetcode.com/problems/fibonacci-number/'}]},
    {name:'Climbing Stairs — Episode 03',meta:'LC 70',diff:'easy',role:'dp[i] = dp[i-1] + dp[i-2] — Fibonacci in disguise',links:[{l:'LC 70',u:'https://leetcode.com/problems/climbing-stairs/'}]},
    {name:'House Robber — Episode 04',meta:'LC 198',diff:'med',role:'dp[i] = max(dp[i-1], dp[i-2]+nums[i])',links:[{l:'LC 198',u:'https://leetcode.com/problems/house-robber/'}]},
    {name:'0/1 Knapsack — Episodes 05 & 07',meta:'GFG · recursion + tabulation',diff:'med',role:'Pick or skip — 2D DP or 1D rolling',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1'}]},
    {name:'Subset Sum — Episode 08',meta:'GFG',diff:'med',role:'Knapsack decision variant — can reach sum S?',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1'}]},
    {name:'Target Sum — Episode 09',meta:'GFG',diff:'med',role:'Count ways ± to reach target — offset DP',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/target-sum-1626326450/1'}]},
    {name:'Longest Increasing Subsequence — Ep 10-11',meta:'LC 300',diff:'med',role:'O(n²) DP and O(n log n) patience sorting',links:[{l:'LC 300',u:'https://leetcode.com/problems/longest-increasing-subsequence/'}]},
    {name:'Longest Common Subsequence — Episode 12',meta:'LC 1143',diff:'med',role:'2D DP on two strings — match or skip',links:[{l:'LC 1143',u:'https://leetcode.com/problems/longest-common-subsequence/'}]},
    {name:'Unique Paths — Episode 13',meta:'LC 62',diff:'med',role:'Grid DP — dp[i][j] = dp[i-1][j] + dp[i][j-1]',links:[{l:'LC 62',u:'https://leetcode.com/problems/unique-paths/'}]},
    {name:'Buy & Sell Stock — Episode 14 (I-IV)',meta:'LC 121, 122, 123, 188',diff:'med',role:'State machines — I: one txn, II: unlimited, III/IV: k txns',links:[{l:'LC 121',u:'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/'},{l:'122',u:'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/'},{l:'123',u:'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/'},{l:'188',u:'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/'}]},
    {name:'Minimum Cost to Cut a Stick — Episode 15',meta:'LC 1547 · Hard',diff:'hard',role:'Interval DP — sort cuts, dp[l][r] = min over k',links:[{l:'LC 1547',u:'https://leetcode.com/problems/minimum-cost-to-cut-a-stick/'}]},
    {name:'Lemonade Change — Greedy',meta:'LC 860',diff:'easy',role:'Greedy change — prefer 10+5 over 5+5+5',links:[{l:'LC 860',u:'https://leetcode.com/problems/lemonade-change/'}]},
    {name:'Jump Game — Greedy',meta:'LC 55',diff:'med',role:'Track max reachable — can you cross?',links:[{l:'LC 55',u:'https://leetcode.com/problems/jump-game/'}]},
    {name:'Assign Cookies — Greedy',meta:'LC 455',diff:'easy',role:'Sort both, match smallest satisfying cookie',links:[{l:'LC 455',u:'https://leetcode.com/problems/assign-cookies/'}]},
    {name:'Fractional Knapsack — Greedy',meta:'GFG',diff:'med',role:'Sort by value/weight — take fractions (differs from 0/1)',links:[{l:'GFG',u:'https://www.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1'}]},
  ]
},
];
