
<script>
        import EqPanel from './EqPanel.svelte';
        import SidePanel from './sp/SidePanel.svelte';
      
        export let startTime;
        export let endTime;
        export let items = []; // Ensure this is passed or initialized properly
        export let pulse = 0; // Initialize pulse to ensure updates happen
      
        // Update pulse value based on external or internal logic
        function setPulse(newPulse) {
          pulse = newPulse;
          console.log("Pulse updated to:", pulse); // Debugging pulse update
        }
      </script>
      
      <div class="bg-gray-800 w-full text-white min-h-screen p-0 m-0">
        <div class="flex px-2 rounded-md bg-gray-900">
      
          <!-- Main content with EqPanel -->
          <div class="w-8/12 min-h-screen max-h-screen p-2 m-0 overflow-x-auto">
            <EqPanel {items} {pulse} {setPulse} />
          </div>
      
          <!-- Side Panel (optional) -->
          <div class="w-4/12 min-h-screen p-2 m-0 mt-2 bg-yellow-950 text-yellow-300b">
            <SidePanel {items} {pulse} />
          </div>
      
        </div>
      </div>
      