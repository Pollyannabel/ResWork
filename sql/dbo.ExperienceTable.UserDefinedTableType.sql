USE [Resolvely]
GO
/****** Object:  UserDefinedTableType [dbo].[ExperienceTable]    Script Date: 12/6/2023 11:58:55 AM ******/
CREATE TYPE [dbo].[ExperienceTable] AS TABLE(
	[ExperienceTypeId] [int] NULL,
	[IsCurrent] [int] NULL,
	[StartDate] [datetime2](7) NULL,
	[EndDate] [datetime2](7) NULL,
	[JobTitle] [varchar](50) NULL,
	[CompanyName] [varchar](100) NULL,
	[City] [varchar](50) NULL,
	[State] [varchar](50) NULL,
	[Country] [varchar](50) NULL,
	[Description] [varchar](4000) NULL
)
GO
