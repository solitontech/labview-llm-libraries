<?xml version='1.0' encoding='UTF-8'?>
<Project Type="Project" LVVersion="20008000">
	<Item Name="My Computer" Type="My Computer">
		<Property Name="server.app.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="server.control.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="server.tcp.enabled" Type="Bool">false</Property>
		<Property Name="server.tcp.port" Type="Int">0</Property>
		<Property Name="server.tcp.serviceName" Type="Str">My Computer/VI Server</Property>
		<Property Name="server.tcp.serviceName.default" Type="Str">My Computer/VI Server</Property>
		<Property Name="server.vi.callsEnabled" Type="Bool">true</Property>
		<Property Name="server.vi.propertiesEnabled" Type="Bool">true</Property>
		<Property Name="specify.custom.address" Type="Bool">false</Property>
		<Item Name="messages" Type="Folder">
			<Item Name="abstract_message_base.lvclass" Type="LVClass" URL="../abstract_message_base/abstract_message_base.lvclass"/>
			<Item Name="message_text.lvclass" Type="LVClass" URL="../message_text/message_text.lvclass"/>
			<Item Name="message_vectors.lvclass" Type="LVClass" URL="../message_vectors/message_vectors.lvclass"/>
		</Item>
		<Item Name="model_child" Type="Folder">
			<Property Name="NI.SortType" Type="Int">3</Property>
			<Item Name="llm_azureopenai_chatmodels.lvclass" Type="LVClass" URL="../llm_azureopenai_chatmodels/llm_azureopenai_chatmodels.lvclass"/>
			<Item Name="llm_openai_chatmodels.lvclass" Type="LVClass" URL="../llm_openai_chatmodels/llm_openai_chatmodels.lvclass"/>
			<Item Name="llm_anthropic_chatmodels.lvclass" Type="LVClass" URL="../llm_anthropic_chatmodels/llm_anthropic_chatmodels.lvclass"/>
			<Item Name="llm_ollama_chatmodels.lvclass" Type="LVClass" URL="../llm_ollama_chatmodels/llm_ollama_chatmodels.lvclass"/>
			<Item Name="llm_gemini_chatmodels.lvclass" Type="LVClass" URL="../llm_gemini_chatmodels/llm_gemini_chatmodels.lvclass"/>
			<Item Name="llm_ollama_embedding.lvclass" Type="LVClass" URL="../llm_ollama_embedding/llm_ollama_embedding.lvclass"/>
			<Item Name="llm_openai_embedding.lvclass" Type="LVClass" URL="../llm_openai_embedding/llm_openai_embedding.lvclass"/>
			<Item Name="llm_gemini_embedding.lvclass" Type="LVClass" URL="../llm_gemini_embedding/llm_gemini_embedding.lvclass"/>
		</Item>
		<Item Name="model_parents" Type="Folder">
			<Item Name="abstract_llm_base.lvclass" Type="LVClass" URL="../abstract_llm_base/abstract_llm_base.lvclass"/>
			<Item Name="abstract_llm_chatcompletion.lvclass" Type="LVClass" URL="../abstract_llm_chatcompletion/abstract_llm_chatcompletion.lvclass"/>
			<Item Name="abstract_llm_embedding.lvclass" Type="LVClass" URL="../abstract_llm_embedding/abstract_llm_embedding.lvclass"/>
		</Item>
		<Item Name="instantiate_chat_model.vi" Type="VI" URL="../instantiate_chat_model.vi"/>
		<Item Name="instantiate_embedding_model.vi" Type="VI" URL="../instantiate_embedding_model.vi"/>
		<Item Name="message_polymorphic.vi" Type="VI" URL="../message_polymorphic.vi"/>
		<Item Name="Dependencies" Type="Dependencies">
			<Item Name="vi.lib" Type="Folder">
				<Item Name="Check if File or Folder Exists.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Check if File or Folder Exists.vi"/>
				<Item Name="Error Cluster From Error Code.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Error Cluster From Error Code.vi"/>
				<Item Name="Get LV Class Name.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/LVClass/Get LV Class Name.vi"/>
				<Item Name="LabVIEWHTTPClient.lvlib" Type="Library" URL="/&lt;vilib&gt;/httpClient/LabVIEWHTTPClient.lvlib"/>
				<Item Name="NI_FileType.lvlib" Type="Library" URL="/&lt;vilib&gt;/Utility/lvfile.llb/NI_FileType.lvlib"/>
				<Item Name="NI_PackedLibraryUtility.lvlib" Type="Library" URL="/&lt;vilib&gt;/Utility/LVLibp/NI_PackedLibraryUtility.lvlib"/>
				<Item Name="Path To Command Line String.vi" Type="VI" URL="/&lt;vilib&gt;/AdvancedString/Path To Command Line String.vi"/>
				<Item Name="PathToUNIXPathString.vi" Type="VI" URL="/&lt;vilib&gt;/Platform/CFURL.llb/PathToUNIXPathString.vi"/>
			</Item>
		</Item>
		<Item Name="Build Specifications" Type="Build"/>
	</Item>
</Project>
