Features Implemented:

1. Read Employee Feature Details:
    a. The data is rendered dynamically with little/no dependency of passing static values in the .html file.
    b. The Edit and Delete buttons are also rendered dynamically is the Column definition is .ts file.
    c. Sorting and Searching features have also been implemented which allow the user to filter through the data.

2. Add Employee Feature details:
    a. Cross-component communication implemented in this feature.
    b. "Form validation" implemented to enter appropriate textual/numeric values.
    c. On Add button clicked callback event is fired which informs the main component about change in table data.

3. Edit Employee feature which consists of the following:
    a. Clicking on edit button leads to the get single employee API which takes id as a parameter call which 
       pre-populates the form data in our common Edit/Add Component. 
    b. The same component has been used for the Edit/Add feature as the template and functionality are almost
       the same with different API calls for Update/Add respectively.
    c. Once the Employee has been added/updated a callback event is fired using employeesUpdated eventemitter
       which is subscribed by our main component's file which causes refreshing/rerendering of our Datatable.

4. Delete Employee feature details:
    a. This is simply a service which leads to the API call and refreshed the Table once delete function is called.

5. Extra routing feature where:
    a. Child routing has been implemented.
    b. passing parameters through route path i.e. query params.
    c. Ability to handle nonexisting paths.

6. Appropriate error handling has been done in the crudService to handle/catch errors.

7. The static settings have been provided in crud.service.js due to presence of router-link.
