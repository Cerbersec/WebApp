USE [Brantano_Database]
GO
/****** Object:  Table [dbo].[Customer_Database_Brantano]    Script Date: 17/10/2020 10:46:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer_Database_Brantano](
	[Customer_ID] [float] NOT NULL,
	[First_Name] [nvarchar](50) NOT NULL,
	[Last_Name] [nvarchar](50) NOT NULL,
	[Sex] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](50) NULL,
	[Email_Adress] [nvarchar](50) NOT NULL,
	[Postal_Code] [smallint] NOT NULL,
	[Bus_Number] [nvarchar](50)  NULL,
	[City] [nvarchar](50) NOT NULL,
	[Country] [nvarchar](50) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](150) NOT NULL,
	[Role_ID] [float] NOT NULL,
	[Role] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Database_Brantano]    Script Date: 17/10/2020 10:46:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Database_Brantano](
	[ID] [nvarchar](50) NOT NULL,
	[Brand] [nvarchar](50) NOT NULL,
	[Gender] [nvarchar](50)NOT NULL,
	[Retail_Price] [float] NOT NULL,
	[Product] [nvarchar](50)NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[Year] [smallint] NOT NULL,
	[ReleaseDate] [date] NOT NULL,
	[Product_Category] [nvarchar](50)NOT NULL,
	[Description] [text] NOT NULL,
	[Sales_Price] [float] NOT NULL,
	[Review_ID] [nvarchar](50)NOT NULL,
	[Stock] [tinyint] NOT NULL,
	[Size] [nvarchar](50) NOT NULL,
	[Category_ID] [bigint] NOT NULL,
	[Color] [nvarchar](100) NOT NULL,
	[Popular] [tinyint] NOT NULL,
	[Image_url] [nvarchar](max) NULL
) ON [PRIMARY]
GO
