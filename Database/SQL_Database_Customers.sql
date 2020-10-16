USE [Customer_DB]
GO
/****** Object:  Table [dbo].[Customer_Database]    Script Date: 16/10/2020 20:00:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer_Database](
	[Customer_ID] [float] NULL,
	[First_Name] [nvarchar](50) NULL,
	[Last_Name] [nvarchar](50) NULL,
	[Phone] [nvarchar](50) NULL,
	[Email_Adress] [varchar](50) NULL,
	[Postal_Code] [smallint] NULL,
	[City] [nvarchar](50) NULL,
	[Country] [nvarchar](50) NULL,
	[Username] [nvarchar](50) NULL,
	[Password] [varchar](50) NULL
) ON [PRIMARY]
GO
