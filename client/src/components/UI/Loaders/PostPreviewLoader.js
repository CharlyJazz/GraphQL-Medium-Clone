import React from 'react'
import ContentLoader from 'react-content-loader'

const PostPreviewLoader = () => (
	<ContentLoader
		height={380}
		width={370}
    speed={1}
    animate={true}
		primaryColor={"#e7e1e6"}
    secondaryColor={"#f0ecef"}
    style={{
      marginLeft: '.5%'
    }}
	>
		<rect x="0" y="19.27" rx="0" ry="0" width="380" height="178" /> 
		<rect x="0" y="216.27" rx="0" ry="0" width="380" height="6" /> 
		<circle cx="20" cy="267.9257535870759" r="20.655753587075928" /> 
		<rect x="50" y="255.27" rx="0" ry="0" width="330" height="26" />
	</ContentLoader>
)

export default PostPreviewLoader