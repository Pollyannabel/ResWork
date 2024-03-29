USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Locations_Insert]    Script Date: 11/21/2023 6:06:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Pollyanna Easterbrook
-- Create date: 11/16/2023
-- Description:	Create a new Location record for dbo.Locations.
-- Code Reviewer: Kelvin Hannah

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Locations_Insert]
		@LocationTypeId int
		,@LineOne nvarchar(255)
		,@LineTwo nvarchar(255)
		,@City nvarchar(255)
		,@Zip nvarchar(50)
		,@StateId int
		,@Latitude float
		,@Longitude float
		,@CreatedBy int
		,@Id int OUTPUT


as

/*

Declare
	  @LocationTypeId int = 4
      ,@LineOne nvarchar(255) = 'CodeReview Test'
      ,@LineTwo nvarchar(255) = 'CodeReview Test'
      ,@City nvarchar(255) = 'CodeReview Test'
      ,@Zip nvarchar(50) = 'CodeReview Test'
      ,@StateId int = 16
      ,@Latitude float = 80.12
      ,@Longitude float = 50.12
	  ,@CreatedBy int = 2
	  ,@Id int

Execute dbo.Locations_Insert
		@LocationTypeId
		,@LineOne
		,@LineTwo
		,@City
		,@Zip
		,@StateId
		,@Latitude
		,@Longitude
		,@CreatedBy
		,@Id OUTPUT

execute dbo.Locations_SelectAll_Paginated @PageIndex = 0, @PageSize = 5;

*/


Begin




INSERT INTO [dbo].[Locations]
           ([LocationTypeId]
           ,[LineOne]
           ,[LineTwo]
           ,[City]
           ,[Zip]
           ,[StateId]
           ,[Latitude]
           ,[Longitude]
		   ,[CreatedBy])

     VALUES
        (@LocationTypeId
		,@LineOne
		,@LineTwo
		,@City
		,@Zip
		,@StateId
		,@Latitude
		,@Longitude
		,@CreatedBy)

	Set @Id = SCOPE_IDENTITY()


End


GO
