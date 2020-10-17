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
	[City] [nvarchar](50) NOT NULL,
	[Country] [nvarchar](50) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Database_Brantano]    Script Date: 17/10/2020 10:46:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Database_Brantano](
	[ID] [nvarchar](50) NULL,
	[Brand] [nvarchar](50) NULL,
	[Gender] [nvarchar](50) NULL,
	[Retail_Price] [float] NULL,
	[Product] [nvarchar](50) NULL,
	[Name] [nvarchar](100) NULL,
	[Year] [smallint] NULL,
	[ReleaseDate] [date] NULL,
	[Product_Category] [nvarchar](50) NULL,
	[Sales_Price] [float] NULL,
	[Review_ID] [nvarchar](50) NULL,
	[Stock] [tinyint] NULL,
	[Size] [nvarchar](50) NULL
) ON [PRIMARY]
GO
