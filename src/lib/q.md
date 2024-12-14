
i am suffering from a very simple problem regarding sveltkit and javscript but this problem has halted my progress.

i have a large sveltekit project divided into 3 levels
    -   slides level
    -   presentation level
    -   App level.

The porblem is that 
    -   at every level we export javascript as well as SvelteComponents.
    -   Each level SvelteComponents when imported in the top level the CSS goes wierd. also since the SvelteComponents exported are not simple Components rather complex Components made up of a large number of child components deep inside. For this reason it is not possible to edit the deeply nested SvelteComponents.
    - Also nesting an app at 3 levels create complex problems

Requirement1: Give me a list of options for this solution.    

Requirement2: give me commpents on my current solution that i am thinking about: instead of 3 levels i should have 1 project with 3 folders each just exporting its own components as usual.

The problem in this solution is that in sveltekit app we have routes and in this case i have routes for all 3 different porjects. so i need to filter out the routes which are not related to a project while uploading .

