USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Experience_InsertBatch]    Script Date: 12/6/2023 11:58:56 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Pollyanna Easterbrook
-- Create date: 12/2/2023
-- Description:	Insert numerous experience records into dbo.Experience table using the User-Defined-Table dbo.ExperienceTable
-- Code Reviewer: Thane Thompson

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


CREATE proc [dbo].[Experience_InsertBatch]
	@BatchExperience dbo.ExperienceTable READONLY
	,@UserId int


as

/* Test Code

Declare @BatchExperience dbo.ExperienceTable, @UserId int


INSERT INTO dbo.Experience
		(
			[UserId]
		   ,[ExperienceTypeId]
           ,[IsCurrent]
           ,[StartDate]
           ,[EndDate]
           ,[JobTitle]
           ,[CompanyName]
           ,[City]
           ,[State]
           ,[Country]
           ,[Description]
		   )

VALUES 
(1,
 1
, 1
, '2022-05-01 00:00:00.0000000'
, '2023-10-30 23:59:59.0100000'
, 'Secretary'
, 'YMCA'
, 'Brooklyn'
, 'New York'
, 'USA'
, 'Clerical duties'),
(
1
, 2
, 1
, '1999-05-01 00:00:00.0000000'
, '2008-08-15 18:59:59.0000000'
, 'Weather Forecaster'
, 'Accuweather'
, 'Little Rock'
, 'Arkansas'
, 'USA'
, 'Forecast weather'
)

execute dbo.Experience_InsertBatch @BatchExperience, @UserId
execute dbo.Experience_Select_All_Paginated @PageIndex = 0, @PageSize = 5

*/


BEGIN



Insert Into dbo.Experience
			(UserId
			,[ExperienceTypeId]
           ,[IsCurrent]
           ,[StartDate]
           ,[EndDate]
           ,[JobTitle]
           ,[CompanyName]
           ,[City]
           ,[State]
           ,[Country]
           ,[Description]
		   )

	Select
           @UserId
		   ,ExperienceTypeId
           ,IsCurrent
           ,StartDate
           ,EndDate
           ,JobTitle
           ,CompanyName
           ,City
           ,State
           ,Country
           ,Description
	From @BatchExperience as be
	WHERE NOT EXISTS (
		SELECT 1
		FROM dbo.Experience as e
		WHERE e.UserId = @UserId	
			AND e.JobTitle = be.JobTitle
			AND e.CompanyName = be.CompanyName
		)


END
GO
