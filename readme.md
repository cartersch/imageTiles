#ImageTiles Jquery Plugin

This plugin will take an list of of images and text and display them in random sizes, but still align.

The basic format would look like this:

  `<ul>
    <li>
      <img src="source">
      <div class="imagetile-caption">
        <div class="imagetile-caption-text">
          some caption
        </div><!--imagetile-caption-text-->
      </div><!--imagetile-caption-->
    </li>
    ...
  </ul>`
  
Currently this plugin will create a 700px wide block with various sized images.  Image sizes currently come in three different widths: 340px, 220px, 160px.
