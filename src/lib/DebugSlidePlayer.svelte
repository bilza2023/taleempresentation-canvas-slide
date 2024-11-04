<script>
  
  export let currentTime;
  export let pulse;
  export let items;
  export let slideExtra;
  export let startTime;
  export let endTime;
  export let spriteImgArray;
  export let bgImages;
</script>

<div>
  <br>
  <br>
  <br>
  <h2>Debug Component</h2>
  <ul>
    <li>Current Time: {currentTime}</li>
    <li>Pulse: {pulse}</li>
    <li>Items Count: length: {items.length}</li>
    <li>Slide Extra: length: {slideExtra.length}</li>
    <li>Start Time: {startTime}</li>
    <li>End Time: {endTime}</li>
    <li>Has Sprite Images: {spriteImgArray ? 'Yes' : 'No'}</li>
    <li>Has Background Images: {bgImages ? 'Yes' : 'No'}</li>
  </ul>
  <br>
  <br>
  <br>
</div>
