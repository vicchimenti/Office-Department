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
    let fulltextNewsDict = {

        contentName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
        headline: getContentValues('<t4 type="content" name="Title" output="normal" modifiers="striptags,htmlentities" />'),
        articleSetup: getContentValues('<t4 type="content" name="Article Setup" output="normal" modifiers="striptags,htmlentities" />'),
        articleSubhead: getContentValues('<t4 type="content" name="Article Subhead" output="normal" modifiers="striptags,htmlentities" />'),
        mediaImage: getContentValues('<t4 type="content" name="Media Library Image" output="normal" formatter="path/*" />'),
        externalImage: getContentValues('<t4 type="content" name="Image" output="imageurl" />'),
        externalImageAlt: getContentValues('<t4 type="content" name="Alt text" output="normal" modifiers="striptags,htmlentities" />'),
        imageCredit: getContentValues('<t4 type="content" name="Image Credit" output="normal" modifiers="striptags,htmlentities" />'),
        caption: getContentValues('<t4 type="content" name="Image Caption" output="normal" modifiers="striptags,htmlentities" />'),
        publishDate: getContentValues('<t4 type="content" name="Publish Date" output="normal" date_format="MMMM d, yyyy" />'),
        author: getContentValues('<t4 type="content" name="Author" output="normal" modifiers="striptags,htmlentities" />'),
        topics: getContentValues('<t4 type="content" name="Topics" output="normal" display_field="name" modifiers="htmlentities" />'),
        fullStory: getContentValues('<t4 type="content" name="Story article" output="normal" modifiers="medialibrary,nav_sections" />'),
        anchor: getContentValues('<t4 type="meta" meta="html_anchor" />'),
        contentId: getContentValues('<t4 type="meta" meta="content_id" />')

    };