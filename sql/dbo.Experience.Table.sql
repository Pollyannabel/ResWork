USE [Resolvely]
GO
/****** Object:  Table [dbo].[Experience]    Script Date: 12/14/2023 3:08:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Experience](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[ExperienceTypeId] [int] NOT NULL,
	[IsCurrent] [int] NOT NULL,
	[StartDate] [datetime2](7) NOT NULL,
	[EndDate] [datetime2](7) NULL,
	[JobTitle] [varchar](50) NOT NULL,
	[CompanyName] [varchar](100) NOT NULL,
	[City] [varchar](50) NOT NULL,
	[State] [varchar](50) NOT NULL,
	[Country] [varchar](50) NOT NULL,
	[Description] [varchar](4000) NOT NULL,
 CONSTRAINT [PK_Experience] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Experience]  WITH CHECK ADD  CONSTRAINT [FK_Experience_ExperienceTypes] FOREIGN KEY([ExperienceTypeId])
REFERENCES [dbo].[ExperienceTypes] ([Id])
GO
ALTER TABLE [dbo].[Experience] CHECK CONSTRAINT [FK_Experience_ExperienceTypes]
GO
