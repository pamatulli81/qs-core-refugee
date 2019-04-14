- UI => Material UI Components (https://material-ui.com/) => Already installed as a dependency 
    - Listbox
    - Slider
    - etc.
- React State => Parent to children (unidirectional), which makes the param passing between components more difficult.
                 Redux is a workaround to pass values between components, despite of the components hierarchy tree.
- New Features and ideas which can be implmented.
    - Drill Down from Table to switch to other visualizations, e.g. with a mouseover effect a div container is opened with the chart:
        - Sankey
        - Scatter Chart
        - Line chart
    - Animated Timeline Slider above the Table
    - Stats Reload instead of About section which triggers a partial reload in Qlik for retrieving some LIVE data

Issues:
- Initial Selection should be set when all components are loaded => do not do that in between as the rendering of the components are async which 
  means that the CHANGE Listener on the model could be triggered before all things are initialized.
- ApplyPatch => we need to be able to pass params via the components also in the case they are not in the same hierarchy tree
             => Redux ?


Open Points:
- Update 14.04.2019 - PAM
    - Echart charts => Map, Barchart, Sankey (on the left) => Alex
    - Additional VIS (scatter chart, line chart) when hovering in the table view
    - Animated Time Slider 
    - Live Reload on stats or logs in the About section
