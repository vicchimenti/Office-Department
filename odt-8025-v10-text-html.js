/***
 *     @author  Victor Chimenti, MSCS
 *     @file    v10-text-html.js
 *                  v10/text/html
 *                  Office-Department Test
 *                  id:8025
 *
 *     Document will write once when the page loads
 *
 *     @version 1.0.2
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
 *
 */
function mediaTag(mediaPath) {

    let itemId = content.get('Media Library Image').getID();
    let mediaInfo = getMediaInfo(itemId);
    let media = readMedia(itemId);
    let info = new ImageInfo();
    info.setInput(media);

    let mediaHTML = (info.check()) ?
        '<img src="' + mediaPath + '" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" />' :
        '<span class="newsroomImageWrapper d-none visually-hidden hidden">Invalid Media ID</span>';

    return mediaHTML;
}




/***
 *      Returns a formatted html img tag
 *      for an external image
 */
function externalImageTag(imagePath, imageAlt, imageTitle) {

    let imageHTML = (imagePath && imageAlt) ?
        '<img src="' + imagePath + '" aria-label="' + imageTitle + '" alt="' + imageAlt + '" loading="auto" />' :
        (imagePath && !imageAlt) ?
        '<img src="' + imagePath + '" aria-label="' + imageTitle + '" alt="' + imageTitle + '" loading="auto" />' :
        '<span class="newsroomImageWrapper d-none visually-hidden hidden">Invalid Image</span>';

    return imageHTML;
}




/***
 *      Create Query
 */
function processQuery(query) {

    let regex = " ";
    let replacement = '%20';
    
    return query.replace(regex, replacement);
}




/***
 *      Link Builder
 */
function processLinks(linkTag) {

    let queryItem = processQuery(linkTag);

    return '<li><a href=/office-directory/?typeOfOffice='+queryItem+'" data-t4-ajax-link="true">' + linkTag + '</a></li>';

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
    let officeDict = {

        contentName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
        officeName: getContentValues('<t4 type="content" name="Office/Dept Name" output="normal" modifiers="striptags,htmlentities" />'),
        description: getContentValues('<t4 type="content" name="General Description" output="normal" modifiers="striptags,htmlentities" />'),
        breadcrumbOption: getContentValues('<t4 type="content" name="Hide Breadcrumbs" output="normal" display_field="value" />'),
        breadcrumbs: getContentValues('<t4 type="navigation" name="Breadcrumbs" id="955" />'),
        schoolsColleges: getContentValues('<t4 type="content" name="Schools & Colleges" output="normal" display_field="value" />'),
        officeType: getContentValues('<t4 type="content" name="Type of Office/Dept" output="normal" display_field="value" />'),
        mediaImage: getContentValues('<t4 type="content" name="Office/Dept Image" output="normal" formatter="path/*" />'),
        phone: getContentValues('<t4 type="content" name="Phone" output="normal" modifiers="striptags,htmlentities" />'),
        email: getContentValues('<t4 type="content" name="Email" output="normal" modifiers="striptags,htmlentities,encode_emails" />'),
        location: getContentValues('<t4 type="content" name="Location" output="normal" modifiers="striptags,htmlentities" />'),
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
    let openGrid = '<div class="hero--basic global-padding--15x"><div class="grid-container"><div class="grid-x grid-margin-x"></div>';
    let closeGrid = '</div></div></div>';
    let openCell8 = '<div class="cell medium-8"><div class="hero--basic__text hero--profile__text text-margin-reset">';
    let closeCell8 = '</div></div>';
    let openCell4 = '<aside class="cell medium-4">';
    let closeCell4 = '</aside>';




    /***
     *  h1 heading
     * 
     * */
    let headingString = (officeDict.officeName.content) ?
        '<h1>' + officeDict.officeName.content + '</h1>' :
        '<h1>' + officeDict.contentName.content + '</h1>';




    /***
     *  process types
     * 
     * */
    let formattedTypes = (officeDict.officeType.content) ?
        processList(officeDict.officeType.content) :
        '<span class="hidden officeType"></span>';




    /***
     *  Description
     * 
     * */
    let descriptionString = (officeDict.description.content) ?
        '<div class="wysiwyg"><p>' + officeDict.description.content + '</p></div>' :
        '<span class="hidden generalDescription"></span>';
    



    /***
     *  Breadcrumbs
     * 
     * */
    let breadcrumbString = (officeDict.breadcrumbOption.content && officeDict.breadcrumbs.content) ?
        '<div class="global-spacing--3x sr-only>' + officeDict.breadcrumbs.content + '</div>' :
        (!officeDict.breadcrumbOption.content && officeDict.breadcrumbs.content) ?
        '<div class="global-spacing--3x>' + officeDict.breadcrumbs.content + '</div>' :
        '<span class="hidden nobreadcrumbs"></span>';




    /***
     *  Icon list
     * 
     * */
    let iconTrue = (    officeDict.phone.content             ||
                        officeDict.email.content             ||
                        officeDict.location.content          ||
                        officeDict.openingHours.content   )  ?
                        true : false;




    /***
     *  Social list
     * 
     * */
    let socialTrue = (  officeDict.tiktok.content         ||
                        officeDict.twitter.content        ||
                        officeDict.youtube.content        ||
                        officeDict.linkedin.content       || 
                        officeDict.instagram.content      ||
                        officeDict.facebook.content       ||
                        officeDict.threads.content    )   ?
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
     *  Social links
     * 
     * */
    let tiktokString = (socialTrue && officeDict.tiktok.content) ?
        '<li>' +
        '<a href="' + officeDict.tiktok.content + '" title="TikTok" aria-label="Tiktok opens in a new tab" target="_blank">' +
        '<span class="show-for-sr">Tiktok</span>' +
        '<span class="fa-brands fa-tiktok" aria-hidden="true"></span>' +
        '</a>' +
        '</li>' :
        '<span class="hidden tiktokSocial"></span>';
    let twitterString = (socialTrue && officeDict.twitter.content) ?
        '<li>' +
        '<a href="' + officeDict.twitter.content + '" title="Twitter X" aria-label="Twitter X opens in a new tab" target="_blank">' +
        '<span class="show-for-sr">Twitter X</span>' +
        '<span class="fa-brands fa-square-x-twitter" aria-hidden="true"></span>' +
        '</a>' +
        '</li>' :
        '<span class="hidden xSocial"></span>';
    let youtubeString = (socialTrue && officeDict.youtube.content) ?
        '<li>' +
        '<a href="' + officeDict.youtube.content + '" title="YouTube" aria-label="YouTube opens in a new tab" target="_blank">' +
        '<span class="show-for-sr">YouTube</span>' +
        '<span class="fa-brands fa-square-youtube" aria-hidden="true"></span>' +
        '</a>' +
        '</li>' :
        '<span class="hidden youtubeSocial"></span>';
    let linkedinString = (socialTrue && officeDict.linkedin.content) ?
        '<li>' +
        '<a href="' + officeDict.linkedin.content + '" title="LinkedIn" aria-label="LinkedIn opens in a new tab" target="_blank">' +
        '<span class="show-for-sr">LinkedIn</span>' +
        '<span class="fa-brands fa-linkedin" aria-hidden="true"></span>' +
        '</a>' +
        '</li>' :
        '<span class="hidden linkedinSocial"></span>';
    let instagramString = (socialTrue && officeDict.instagram.content) ?
        '<li>' +
        '<a href="' + officeDict.instagram.content + '" title="Instagram" aria-label="Instagram opens in a new tab" target="_blank">' +
        '<span class="show-for-sr">Instagram</span>' +
        '<span class="fa-brands fa-square-instagram" aria-hidden="true"></span>' +
        '</a>' +
        '</li>' :
        '<span class="hidden instagramSocial"></span>';
    let facebookString = (socialTrue && officeDict.facebook.content) ?
        '<li>' +
        '<a href="' + officeDict.facebook.content + '" title="Facebook" aria-label="Facebook opens in a new tab" target="_blank">' +
        '<span class="show-for-sr">Facebook</span>' +
        '<span class="fa-brands fa-square-threads" aria-hidden="true"></span>' +
        '</a>' +
        '</li>' :
        '<span class="hidden facebookSocial"></span>';
    let threadsString = (socialTrue && officeDict.threads.content) ?
        '<li>' +
        '<a href="' + officeDict.threads.content + '" title="Threads" aria-label="Threads opens in a new tab" target="_blank">' +
        '<span class="show-for-sr">Threads</span>' +
        '<span class="fa-brands fa-square-threads" aria-hidden="true"></span>' +
        '</a>' +
        '</li>' :
        '<span class="hidden threadsSocial"></span>';
        





    


    /***
     *  prioritize media library image
     * 
     * */
    let imageString = (officeDict.mediaImage.content) ?
        mediaTag(officeDict.mediaImage.content) :
        externalImageTag(officeDict.externalImage.content, officeDict.externalImageAlt.content, officeDict.contentName.content);




    /***
     *  write document once
     * 
     * */
    writeDocument(
        [
            openGrid,
            openCell8,
            headingString,
            formattedTypes,
            descriptionString,
            breadcrumbString,
            closeCell8,
            openCell4,
            imageString,
            openDetail,
            openIconList,

            closeIconList,
            openSocial,
            tiktokString,
            twitterString,
            youtubeString,
            linkedinString,
            instagramString,
            facebookString,
            threadsString,
            closeSocial,
            closeDetail,
            closeCell4,
            closeGrid
        ]
    );




} catch (err) {
    document.write(err.message);
}