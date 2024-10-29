/***
 *     @author  Victor Chimenti, MSCS
 *     @file    v10-text-html.js
 *                  v10/text/html
 *                  Office-Department Test
 *                  id:8025
 *
 *     Document will write once when the page loads
 *
 *     @version 1.0.1
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
 *      Returns an array of list items
 */
function assignList(arrayOfValues) {

    let listValues = '';

    for (let i = 0; i < arrayOfValues.length; i++) {

        if (i < arrayOfValues.length-1) {

            listValues += '' + arrayOfValues[i].trim() + ' / ';

        } else {

            listValues += '' + arrayOfValues[i].trim();

        }

    }
    
    return listValues;
}




/***
 *      Processes and formats list items into their wrapper
 */
function processList(rawValues) {

    let arrayOfTops = rawValues.split(',');
    let listItems = assignList(arrayOfTops) || null;

    let result = (listItems) ?
        '<p class="newsroomArticleTopicsHeader">' + listItems + '</p>':
        '<span class="newsroomArticleTopicsHeader d-none hidden visually-hidden">No Valid Topic Provided</span>';

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
        description: getContentValues('<t4 type="content" name="General Description" output="normal" modifiers="striptags,htmlentities,nl2br" />'),
        breadcrumbs: getContentValues('<t4 type="content" name="Hide Breadcrumbs" output="normal" display_field="value" />'),
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


    

    /***
     *  prioritize media library image
     * 
     * */
    let imageString = (officeDict.mediaImage.content) ?
    mediaTag(officeDict.mediaImage.content) :
    externalImageTag(officeDict.externalImage.content, officeDict.externalImageAlt.content, officeDict.contentName.content);




    /***
     *  process categories
     * 
     * */

    let formattedTopics = (officeDict.topics.content) ?
    processList(officeDict.topics.content) :
    '<span class="newsroomArticleTopicsHeader d-none hidden visually-hidden">No Valid Topic Provided</span>';




    /***
     *  write document once
     * 
     * */
    writeDocument(
        [
            openGrid,
            openCell8,

            closeCell8,


            closeGrid
        ]
    );




} catch (err) {
    document.write(err.message);
}