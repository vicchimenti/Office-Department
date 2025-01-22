/***
 *     @author  Victor Chimenti, MSCS
 *     @file    v10-text-listing.js
 *                  v10/text/listing
 *                  Office-Department
 *                  id:7355
 *
 *     Document will write once when the page loads
 *
 *     @version 2.0.1
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
 *      Returns a media object
 */
function getMediaInfo(mediaID) {

    let mediaManager = ApplicationContextProvider.getBean(IMediaManager);
    let media = mediaManager.get(mediaID, language);

    return media;
}




/***
 *      Returns a media stream object
 */
function readMedia(mediaID) {

    let mediaObj = getMediaInfo(mediaID);
    let oMediaStream = mediaObj.getMedia();

    return oMediaStream;
}




/***
 *     Returns a formatted html img tag
 *     for a media library image element
 *     with required attributes
 *
 */
function mediaTag(mediaPath, mediaPathFull) {

    let imageW1 = ' 360w, ';
    let imageW2 = ' 728w';
    let itemId = content.get('Office/Dept Image').getID();
    let mediaInfo = getMediaInfo(itemId);
    let media = readMedia(itemId);
    let info = new ImageInfo();
    info.setInput(media);

    let mediaHTML = (info.check()) ?
        '<figure class="aspect-ratio-frame" style="--aspect-ratio: 22/36">' +
        '<img loading="eager" src="' + mediaPath + '" srcset="' + mediaPath + imageW1 + mediaPathFull + imageW2 + '" sizes="(min-width: 1280px) 360px, (min-width: 780px) 29.17vw, calc(100vw - 40px)" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" class="js-processed" />' +
        '</figure>' :
        '<span class="hidden invalidMediaId"></span>';

    return mediaHTML;
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


    return '<li><a href="/office-directory/?typeOfOffice='+queryItem+'" data-t4-ajax-link="true">' + linkTag + '</a></li>';
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
        '<div class="tags tags__links"><h2 class="tags__heading show-for-sr">Profile Type:</h2><ul>' + listItems + '</ul></h2></div>':
        '<span class="hidden officeTypeList"></span>';

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

        resultsArray = '<span class="hidden ' + tag + '"></span>'
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
        mediaImage: getContentValues('<t4 type="content" name="Office/Dept Image" output="normal" formatter="v10/image/pxl-crop" cdn="true" pxl-filter-id="57" />'),
        mediaImageFull: getContentValues('<t4 type="content" name="Office/Dept Image" output="normal" formatter="v10/image/pxl-crop" cdn="true" pxl-filter-id="58" />'),
        phone: getContentValues('<t4 type="content" name="Phone" output="normal" modifiers="striptags,htmlentities" />'),
        email: getContentValues('<t4 type="content" name="Email" output="normal" modifiers="striptags,htmlentities,encode_emails" />'),
        location: getContentValues('<t4 type="content" name="Location" output="normal" modifiers="nl2br" />'),
        openingHours: getContentValues('<t4 type="content" name="Opening Hours" output="normal" modifiers="striptags,htmlentities" />'),
        facebook: getContentValues('<t4 type="content" name="Facebook URL" output="normal" modifiers="striptags,htmlentities" />'),
        linkedin: getContentValues('<t4 type="content" name="LinkedIn URL" output="normal" modifiers="striptags,htmlentities" />'),
        twitter: getContentValues('<t4 type="content" name="Twitter/X URL" output="normal" modifiers="striptags,htmlentities" />'),
        youtube: getContentValues('<t4 type="content" name="YouTube URL" output="normal" modifiers="striptags,htmlentities" />'),
        instagram: getContentValues('<t4 type="content" name="Instagram URL" output="normal" modifiers="striptags,htmlentities" />'),
        tiktok: getContentValues('<t4 type="content" name="TikTok URL" output="normal" modifiers="striptags,htmlentities" />'),
        threads: getContentValues('<t4 type="content" name="Threads URL" output="normal" modifiers="striptags,htmlentities" />'),
        anchor: getContentValues('<t4 type="meta" meta="html_anchor" />'),
        contentId: getContentValues('<t4 type="meta" meta="content_id" />')

    };




    /***
     *  declarations
     * 
     * */


    let openCell4 = '<aside class="cell medium-4">';
    let closeCell4 = '</aside>';




    /***
     *  h1 heading
     * 
     * */
    let headingString = (odListingDict.officeName.content) ?
        '<h1>' + odListingDict.officeName.content + '</h1>' :
        '<h1>' + odListingDict.contentName.content + '</h1>';




    /***
     *  process types
     * 
     * */
    let formattedTypes = (odListingDict.officeType.content) ?
        processList(odListingDict.officeType.content) :
        '<span class="hidden officeType"></span>';




    /***
     *  Description
     * 
     * */
    let descriptionString = (odListingDict.description.content) ?
        '<div class="wysiwyg"><p>' + odListingDict.description.content + '</p></div>' :
        '<span class="hidden generalDescription"></span>';
    




    /***
     *  media library image
     * 
     * */
    let imageString = (odListingDict.mediaImage.content && odListingDict.mediaImageFull.content) ?
        mediaTag(odListingDict.mediaImage.content, odListingDict.mediaImageFull.content) :
        '<span class="hidden noImage"></span>';




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
     *  Social list
     * 
     * */
    let socialTrue = (  odListingDict.tiktok.content         ||
                        odListingDict.twitter.content        ||
                        odListingDict.youtube.content        ||
                        odListingDict.linkedin.content       || 
                        odListingDict.instagram.content      ||
                        odListingDict.facebook.content       ||
                        odListingDict.threads.content    )   ?
                        true : false;




    /***
     *  Detail Wrappers
     * 
     * */
    let openDetail = (socialTrue || iconTrue) ?
        '<div class="office-detail--contact">' :
        '<span class="hidden detailWrapper"></span>';
    let closeDetail = (socialTrue || iconTrue) ?
        '</div>' :
        '<span class="hidden detailWrapperClosure"></span>';
    let openIconList = (iconTrue) ?
        '<div class="eyebrow" id="office-title">Contact Information</div><ul class="icon-list" id="office-list">' :
        '<span class="hidden contactList"></span>';
    let closeIconList = (iconTrue) ?
        '</ul>' :
        '<span class="hidden contactListClosure"></span>';                      
    let openSocial = (socialTrue) ?
        '<div class="eyebrow" id="connect">Connect</div><ul class="icon-list social-media btn-row" id="social-media-icons">' :
        '<span class="hidden socialList"></span>';
    let closeSocial = (socialTrue) ?
        '</ul>' :
        '<span class="hidden socialLinksClosure"></span>';




    /***
     *  Contact links
     * 
     * */
    let phoneString = (iconTrue && odListingDict.phone.content) ?
        '<li>' +
        '<span class="icon-list__icon fas fa-phone" aria-hidden="true"></span>' +
        '<span class="icon-list__content">' +
        '<a href="tel:'+odListingDict.phone.content+'">' + odListingDict.phone.content + '</a>' +
        '</span>' +
        '</li>' : null;
    let emailString = (iconTrue && odListingDict.email.content) ?
        '<li>' +
        '<span class="icon-list__icon fas fa-envelope" aria-hidden="true"></span>' +
        '<span class="icon-list__content">' +
        '<a href="mailto:'+odListingDict.email.content+'">' + odListingDict.email.content + '</a>' +
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
    let contactString = iconValidator(contactArray, "contactDetails");
    



    /***
     *  Social links
     * 
     * */
    let tiktokString = (socialTrue && odListingDict.tiktok.content) ?
        '<li>' +
        '<a href="' + odListingDict.tiktok.content + '" title="TikTok" aria-label="Tiktok opens in a new tab" target="_blank">' +
        '<span class="show-for-sr">Tiktok</span>' +
        '<span class="fa-brands fa-tiktok" aria-hidden="true"></span>' +
        '</a>' +
        '</li>' : null;
    let twitterString = (socialTrue && odListingDict.twitter.content) ?
        '<li>' +
        '<a href="' + odListingDict.twitter.content + '" title="Twitter X" aria-label="Twitter X opens in a new tab" target="_blank">' +
        '<span class="show-for-sr">Twitter X</span>' +
        '<span class="fa-brands fa-square-x-twitter" aria-hidden="true"></span>' +
        '</a>' +
        '</li>' : null;
    let youtubeString = (socialTrue && odListingDict.youtube.content) ?
        '<li>' +
        '<a href="' + odListingDict.youtube.content + '" title="YouTube" aria-label="YouTube opens in a new tab" target="_blank">' +
        '<span class="show-for-sr">YouTube</span>' +
        '<span class="fa-brands fa-square-youtube" aria-hidden="true"></span>' +
        '</a>' +
        '</li>' : null;
    let linkedinString = (socialTrue && odListingDict.linkedin.content) ?
        '<li>' +
        '<a href="' + odListingDict.linkedin.content + '" title="LinkedIn" aria-label="LinkedIn opens in a new tab" target="_blank">' +
        '<span class="show-for-sr">LinkedIn</span>' +
        '<span class="fa-brands fa-linkedin" aria-hidden="true"></span>' +
        '</a>' +
        '</li>' : null;
    let instagramString = (socialTrue && odListingDict.instagram.content) ?
        '<li>' +
        '<a href="' + odListingDict.instagram.content + '" title="Instagram" aria-label="Instagram opens in a new tab" target="_blank">' +
        '<span class="show-for-sr">Instagram</span>' +
        '<span class="fa-brands fa-square-instagram" aria-hidden="true"></span>' +
        '</a>' +
        '</li>' : null;
    let facebookString = (socialTrue && odListingDict.facebook.content) ?
        '<li>' +
        '<a href="' + odListingDict.facebook.content + '" title="Facebook" aria-label="Facebook opens in a new tab" target="_blank">' +
        '<span class="show-for-sr">Facebook</span>' +
        '<span class="fa-brands fa-square-facebook" aria-hidden="true"></span>' +
        '</a>' +
        '</li>' : null;
    let threadsString = (socialTrue && odListingDict.threads.content) ?
        '<li>' +
        '<a href="' + odListingDict.threads.content + '" title="Threads" aria-label="Threads opens in a new tab" target="_blank">' +
        '<span class="show-for-sr">Threads</span>' +
        '<span class="fa-brands fa-square-threads" aria-hidden="true"></span>' +
        '</a>' +
        '</li>' : null;
    let socialArray = (socialTrue) ? [tiktokString, twitterString, youtubeString, linkedinString, instagramString, facebookString, threadsString] : null;
    let socialString = iconValidator(socialArray, "socialDetails");








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
            formattedTypes,
            descriptionString,
            closeCell8,
            openCell4,
            imageString,
            openDetail,
            openIconList,
            contactString,
            closeIconList,
            openSocial,
            socialString,
            closeSocial,
            closeDetail,
            closeCell4,
            
            
            
            closeGrid,
            closeArticle
        ]
    );




} catch (err) {
    document.write(err.message);
}