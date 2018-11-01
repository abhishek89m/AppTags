# AppTags
Simple tags management app demo. Add, edit or delete tags.

Functionalities are as follows :
  1. User can add tags by typing them into the text field, separated with comma, semicolon or line break, and pressing the button “Add tags”.
    * After  Add tags button is clicked, the text area is cleared.
  2. Tags can only be numeric, and any tag entered with charaters will be omited.
  3. Tags with value less than 0 would be colored to blue, while tags with values more or equal to 0 would be colored to red.
  4. User can delete the tags on by one, by clicking on the cross button in the tag.
    * A prompt is shown to the user before deleting the tag, and the tag is deleted only if the user confirms.
  5. The tags can be edited by clicking on the Edit tags button.
    * On clicking on the Edit tags button, a modal window with form, containing text field with tags, separated by comma, and a “Save” button would appear.
    * On clicking on the Save tags button in the modal, the modal will get closed, and the tags list will get updated.
    * While editting, the delimiters can be changed by the user to semicolons and/or line breaks.
  6. If the user refreshes the page, the saved tags list is restored from the localstorage.
    * This is not possible in browsers where the HTML5 Storage APIs are not supported. In such cases the tags list is not saved.
    * The tags listed in the text area, but not added to the list are ignored while saving.