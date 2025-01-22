/***
 *     @author  Victor Chimenti, MSCS
 *     @file    v10-text-listing.js
 *                  v10/text/listing
 *                  Office-Department
 *                  id:7355
 *
 *     Document will write once when the page loads
 *
 *     @version 2.0.4
 * 
 */








/***
 *      Import T4 Utilities
 */
importClass(com.terminalfour.media.IMediaManager);
importClass(com.terminalfour.spring.ApplicationContextProvider);
importClass(com.terminalfour.publish.utils.BrokerUtils);
importClass(com.terminalfour.media.utils.ImageInfo);




/***
 *  declarations
 * 
 * */
let openArticle = '<article class="listing--item department--item global-padding--5x">';
let closeArticle = '</article>';
let openGrid = '<div class="grid-container"><div class="grid-x grid-margin-x">';
let closeGrid = '</div></div>';
let openCell8 = '<div class="cell medium-8 medium-offset-1 text-margin-reset">';
let closeCell8 = '</div>';
let openCell3 = '<div class="cell medium-3">';
let closeCell3 = '</div>';




/***
 *      Extract values from T4 element tags
 *      and confirm valid existing content item field
 */
function getContentValues(tag) {
    try {
        let _tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag).trim();
        return {
            isError: false,
            content: _tag == '' ? null : _tag
        };
    } catch (error) {
        return {
            isError: true,
            message: error.message
        };
    }
}




/***
 *      Create Query
 */
function processQuery(query) {

    let regex = /\s/g;
    let replacement = "%20";

    
    return query.replace(regex, replacement);
}




/***
 *      Link Builder
 */
function processLinks(linkTag) {

    let queryItem = processQuery(linkTag);

    return '<li><a href="/office-directory/?typeOfOffice=' + queryItem + '" data-t4-ajax-link="true" title="' + linkTag + '">' + linkTag + '</a></li>';
}




/***
 *      Returns an array of list items
 */
function assignList(arrayOfValues) {

    let listValues = '';

    for (let i = 0; i < arrayOfValues.length; i++) {

        let linkItem = String(arrayOfValues[i]).trim();
        listValues += processLinks(linkItem);
    }
    
    return listValues;
}





/***
 *      Processes and formats list items into their wrapper
 */
function processList(rawValues) {

    let arrayOfTags = rawValues.split(',');
    let listItems = assignList(arrayOfTags) || null;

    let result = (listItems) ?
        '<div class="global-spacing--2x tags tags__links"><h4 class="tags__heading show-for-sr">School or College:</h4><ul>' + listItems + '</ul></div>':
        '<span hidden class="hidden officeTypeList"></span>';

    return result;
}




function iconValidator(array, tag) {
    
    let resultsArray = "";

    if (array) {

        for (let i = 0; i < array.length; i++) {

            if (array[i]) {
                resultsArray += array[i];
            }
    
        }
    } else {

        resultsArray = '<span hidden class="hidden ' + tag + '"></span>'
    }

    return resultsArray;
}




/***
 *      Write the document
 */
function writeDocument(array) {

    for (let i = 0; i < array.length; i++) {

        document.write(array[i]);
    }
}








/***
 *  Main
 */
try {




    /***
     *      Dictionary of content
     * */
    let odListingDict = {

        contentName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
        officeName: getContentValues('<t4 type="content" name="Office/Dept Name" output="normal" modifiers="striptags,htmlentities" />'),
        description: getContentValues('<t4 type="content" name="General Description" output="normal" modifiers="striptags,htmlentities" />'),
        schoolsColleges: getContentValues('<t4 type="content" name="Schools & Colleges" output="normal" display_field="value" />'),
        officeType: getContentValues('<t4 type="content" name="Type of Office/Dept" output="normal" display_field="value" />'),
        phone: getContentValues('<t4 type="content" name="Phone" output="normal" modifiers="striptags,htmlentities" />'),
        email: getContentValues('<t4 type="content" name="Email" output="normal" modifiers="striptags,htmlentities,encode_emails" />'),
        location: getContentValues('<t4 type="content" name="Location" output="normal" modifiers="nl2br" />'),
        openingHours: getContentValues('<t4 type="content" name="Opening Hours" output="normal" modifiers="striptags,htmlentities" />'),
        anchor: getContentValues('<t4 type="meta" meta="html_anchor" />'),
        contentId: getContentValues('<t4 type="meta" meta="content_id" />')

    };




    /***
     *  h3 heading
     * 
     * */
    let headingString = (odListingDict.officeName.content) ?
        '<h3 class="h4 funderline"><a href="" title="' + odListingDict.officeName.content + '">' + odListingDict.officeName.content + '</a></h3>' :
        '<h3 class="h4 funderline"><a href="" title="' + odListingDict.contentName.content + '">' + odListingDict.contentName.content + '</a></h3>';




    /***
     *  Description
     * 
     * */
    let descriptionString = (odListingDict.description.content) ?
    '<div class="global-spacing--2x"><p>' + odListingDict.description.content + '</p></div>' :
    '<span hidden class="hidden generalDescription"></span>';
       
            


    /***
     *  process types
     * 
     * */
    let formattedTypes = (odListingDict.officeType.content) ?
        processList(odListingDict.officeType.content) :
        '<span hidden class="hidden officeType"></span>';




    /***
     *  Icon list
     * 
     * */
    let iconTrue = (    odListingDict.phone.content             ||
                        odListingDict.email.content             ||
                        odListingDict.location.content          ||
                        odListingDict.openingHours.content   )  ?
                        true : false;




    /***
     *  Icon Wrappers
     * 
     * */
    let openIconList = (iconTrue) ?
        '<ul class="icon-list">' :
        '<span hidden class="hidden contactList"></span>';
    let closeIconList = (iconTrue) ?
        '</ul>' :
        '<span hidden class="hidden contactListIcons"></span>';





    /***
     *  Contact links
     * 
     * */
    let phoneString = (iconTrue && odListingDict.phone.content && odListingDict.officeName.content) ?
        '<li>' + 
        '<span class="icon-list__icon fas fa-phone" aria-hidden="true"></span>' +
        '<span class="icon-list__content">' +
        '<a href="tel:' + odListingDict.phone.content + '" title="Call: ' + odListingDict.officeName.content + '">' + odListingDict.phone.content + '</a>' +
        '</span>' +
        '</li>' : null;
    let emailString = (iconTrue && odListingDict.email.content && odListingDict.officeName.content) ?
        '<li>' +
        '<span class="icon-list__icon fas fa-envelope" aria-hidden="true"></span>' +
        '<span class="icon-list__content">' +
        '<a href="mailto:' + odListingDict.email.content + '" title="Email: ' + odListingDict.officeName.content + '">' + odListingDict.email.content + '</a>' +
        '</span>' +
        '</li>' : null;
    let locationString = (iconTrue && odListingDict.location.content) ?
        '<li>' +
        '<span class="icon-list__icon fas fa-map-marker-alt" aria-hidden="true"></span>' +
        '<span class="icon-list__content">' + odListingDict.location.content + '</span>' +
        '</li>' : null;
    let openingHoursString = (iconTrue && odListingDict.openingHours.content) ?
        '<li>' +
        '<span class="icon-list__icon fas fa-clock" aria-hidden="true"></span>' +
        '<span class="icon-list__content">' + odListingDict.openingHours.content + '</span>' +
        '</li>' : null;
    let contactArray = (iconTrue) ? [phoneString, emailString, locationString, openingHoursString] : null;
    let contactString = (contactArray) ? iconValidator(contactArray, "contactDetails") : '<span hidden class="hidden contacts"></span>';
    







    /***
     *  write document once
     * 
     * */
    writeDocument(
        [

            openArticle,
            openGrid,
            openCell8,
            headingString,
            descriptionString,
            formattedTypes,
            closeCell8,
            openCell3,
            openIconList,
            contactString,
            closeIconList,
            closeCell3,         
            closeGrid,
            closeArticle

        ]
    );




} catch (err) {
    document.write(err.message);
}