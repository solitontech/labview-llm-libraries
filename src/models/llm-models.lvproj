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
		<Item Name="examples" Type="Folder">
			<Item Name="utils" Type="Folder">
				<Item Name="Get_Env_Var.vi" Type="VI" URL="../examples/utils/Get_Env_Var.vi"/>
				<Item Name="Set_Env_Var.vi" Type="VI" URL="../examples/utils/Set_Env_Var.vi"/>
			</Item>
			<Item Name="example_llm_azureopenai_unit_test_1.vi" Type="VI" URL="../examples/example_llm_azureopenai_unit_test_1.vi"/>
			<Item Name="example_llm_openai_unit_test_1.vi" Type="VI" URL="../examples/example_llm_openai_unit_test_1.vi"/>
		</Item>
		<Item Name="messages" Type="Folder">
			<Item Name="abstract_message_base.lvclass" Type="LVClass" URL="../abstract_message_base/abstract_message_base.lvclass"/>
			<Item Name="message_text.lvclass" Type="LVClass" URL="../message_text/message_text.lvclass"/>
		</Item>
		<Item Name="model_child" Type="Folder">
			<Item Name="llm_azureopenai_chatmodels.lvclass" Type="LVClass" URL="../llm_azureopenai_chatmodels/llm_azureopenai_chatmodels.lvclass"/>
			<Item Name="llm_openai_chatmodels.lvclass" Type="LVClass" URL="../llm_openai_chatmodels/llm_openai_chatmodels.lvclass"/>
		</Item>
		<Item Name="model_parents" Type="Folder">
			<Item Name="abstract_llm_base.lvclass" Type="LVClass" URL="../abstract_llm_base/abstract_llm_base.lvclass"/>
			<Item Name="abstract_llm_chatcompletion.lvclass" Type="LVClass" URL="../abstract_llm_chatcompletion/abstract_llm_chatcompletion.lvclass"/>
		</Item>
		<Item Name="Dependencies" Type="Dependencies">
			<Item Name="vi.lib" Type="Folder">
				<Item Name="Check if File or Folder Exists.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/libraryn.llb/Check if File or Folder Exists.vi"/>
				<Item Name="Error Cluster From Error Code.vi" Type="VI" URL="/&lt;vilib&gt;/Utility/error.llb/Error Cluster From Error Code.vi"/>
				<Item Name="LabVIEWHTTPClient.lvlib" Type="Library" URL="/&lt;vilib&gt;/httpClient/LabVIEWHTTPClient.lvlib"/>
				<Item Name="NI_FileType.lvlib" Type="Library" URL="/&lt;vilib&gt;/Utility/lvfile.llb/NI_FileType.lvlib"/>
				<Item Name="NI_PackedLibraryUtility.lvlib" Type="Library" URL="/&lt;vilib&gt;/Utility/LVLibp/NI_PackedLibraryUtility.lvlib"/>
				<Item Name="Path To Command Line String.vi" Type="VI" URL="/&lt;vilib&gt;/AdvancedString/Path To Command Line String.vi"/>
				<Item Name="PathToUNIXPathString.vi" Type="VI" URL="/&lt;vilib&gt;/Platform/CFURL.llb/PathToUNIXPathString.vi"/>
			</Item>
			<Item Name="kernel32.dll" Type="Document" URL="kernel32.dll">
				<Property Name="NI.PreserveRelativePath" Type="Bool">true</Property>
			</Item>
		</Item>
		<Item Name="Build Specifications" Type="Build"/>
	</Item>
</Project>
